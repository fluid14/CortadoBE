import {Injectable} from '@nestjs/common';
import Stripe from "stripe";
import {ConfigService} from "@nestjs/config";
import {CustomerInterface} from "./models/customer.interface";
import {UserInterface} from "../user/models/user.interface";
import routes from "../routes";
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import {catchError, tap} from "rxjs";
import throwAxiosData from "../core/helpers/throwAxiosData";
import catchAxiosError from "../core/helpers/catchAxiosError";

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        private readonly configService: ConfigService,
        private readonly strapiApiHttpService: StrapiApiHttpService
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
        } = body;

        const checkoutPayload = {
            ...body
        };

        checkoutPayload.success_url = `${this.configService.get<string>('FRONTEND_URL')}/${success_url}`
        checkoutPayload.cancel_url = `${this.configService.get<string>('FRONTEND_URL')}/${cancel_url}`

        const session = await this.stripe.checkout.sessions.create(checkoutPayload)

        const products = body.line_items.map(({price: stripeId, quantity}) => ({
            stripeId, quantity
        }));

        const data = {
            stripeSessionId: session.id,
            stripeUserId: session.customer,
            stripeShippingId: session.shipping_cost.shipping_rate,
            price: session.amount_total / 100,
            info: JSON.stringify(body.payment_intent_data.metadata) || '',
            startDate: body.payment_intent_data.metadata.subscriptionStartDate,
            products
        }

        this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.order.create, JSON.stringify({data}))
            .pipe(
                tap((data) => throwAxiosData(data)),
                catchError(err => catchAxiosError(err))
            )
            .subscribe()

        return session
    };

    createCustomer = async (body: CustomerInterface) => {
        return await this.stripe.customers.create({
            name: `${body.name} ${body.surname}`,
            email: body.email,
        })
    };

    getShippingMethods = async () => {
        return this.stripe.shippingRates.list()
    }
}
