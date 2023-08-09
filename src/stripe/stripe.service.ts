import {Injectable} from '@nestjs/common';
import Stripe from "stripe";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
                apiVersion: '2022-11-15'
            }
        );
    }

    createSession = async (body) => {
        const {
            success_url,
            cancel_url
        } = body;

        const checkoutPayload = {
            ...body
        };

        checkoutPayload.success_url = `${this.configService.get<string>('FRONTEND_URL')}/${success_url}`
        checkoutPayload.cancel_url = `${this.configService.get<string>('FRONTEND_URL')}/${cancel_url}`

        // if (isVat) checkoutPayload.invoice_creation = {};

        console.log(checkoutPayload);
        return await this.stripe.checkout.sessions.create(checkoutPayload)
    };

    createCustomer = async (body) => {
        return await this.stripe.customers.create({
            name: `${body.name} ${body.surname}`,
            email: body.email,
        })
    };

    getShippingMethods = async () => {
        return this.stripe.shippingRates.list()
    }
}
