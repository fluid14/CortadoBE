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
        return await this.stripe.checkout.sessions.create({
            success_url: `${this.configService.get<string>('FRONTEND_URL')}/sukces`,
            cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/anulowano`,
            line_items: [
                {price: 'price_1NaLE7GT9eLSyBCCrbvTi6Xg', quantity: 2},
            ],
            mode: 'payment',
            customer: 'cus_OPLrgVqWakf5Zd'
        })
    };

    createCustomer = async (body) => {
        return await this.stripe.customers.create({
            name: `${body.name} ${body.surname}`,
            email: body.email,
        })
    };
}
