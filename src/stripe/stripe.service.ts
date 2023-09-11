import {Injectable} from '@nestjs/common';
import Stripe from "stripe";
import {ConfigService} from "@nestjs/config";
import {CustomerInterface} from "./models/customer.interface";
import {UserInterface} from "../user/models/user.interface";
import routes from "../routes";
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import throwAxiosData from "../core/helpers/throwAxiosData";
import catchAxiosError from "../core/helpers/catchAxiosError";
import {UserService} from "../user/user.service";

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        private readonly configService: ConfigService,
        private readonly strapiApiHttpService: StrapiApiHttpService,
        private readonly userService: UserService
    ) {
        this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
                apiVersion: '2022-11-15'
            }
        );
    }

    createSession = async (body) => {
        const {
            success_url,
            cancel_url,
            user,
            products,
            shipping,
            status
        } = body;

        const checkoutPayload = {
            ...body
        };

        checkoutPayload.success_url = `${this.configService.get<string>('FRONTEND_URL')}/${success_url}`;
        checkoutPayload.cancel_url = `${this.configService.get<string>('FRONTEND_URL')}/${cancel_url}`;
        if(checkoutPayload.customer === '' || !checkoutPayload.customer) delete checkoutPayload.customer;
        delete checkoutPayload.user;
        delete checkoutPayload.products;
        delete checkoutPayload.shipping;
        delete checkoutPayload.status;

        const session = await this.stripe.checkout.sessions.create(checkoutPayload);

        const data = {
            stripeSessionId: session.id,
            stripeUserId: session.customer,
            stripeShippingId: session.shipping_cost.shipping_rate,
            price: session.amount_total / 100,
            info: JSON.stringify(body.payment_intent_data.metadata) || '',
            startDate: body.payment_intent_data.metadata.subscriptionStartDate,
            products,
            user,
            shipping,
            status
        }

        this.strapiApiHttpService
            .post(routes.strapiApi.order.create, JSON.stringify({data}))
            .pipe(
                tap((data) => throwAxiosData(data)),
                switchMap(data => {
                    return this.userService.getUser(user).pipe(switchMap(userData => {
                        const orders = userData.data.orders.map(({id}) => id)
                        return this.userService.update(user, {orders: [...orders, data.data.data.id]})
                    }))
                }),
                catchError(err => catchAxiosError(err))
            )
            .subscribe();

        return session;
    };

    getShippingMethods = async () => {
        return this.stripe.shippingRates.list()
    }
}
