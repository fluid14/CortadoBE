import {Injectable} from '@nestjs/common';
import {map, Observable, switchMap} from "rxjs";
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import routes from "../routes";
import {UserInterface} from "./models/user.interface";
import {AxiosResponse} from 'axios';
import {ForgotPasswordInterface} from "./models/forgot-password.interface";
import {RegisterInterface} from "./models/register.interface";
import {UpdateInterface} from "./models/update.interface";
import {LoginInterface} from "./models/login.interface";
import {ResetPasswordInterface} from "./models/reset-password.interface";
import Stripe from "stripe";
import {ConfigService} from "@nestjs/config";
import {CustomerInterface} from "../stripe/models/customer.interface";
import {GetUserInterface} from "./models/get-user.interface";

@Injectable()
export class UserService {
    private stripe: Stripe;

    constructor(private strapiApiHttpService: StrapiApiHttpService, private readonly configService: ConfigService,
    ) {
        this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
                apiVersion: '2022-11-15'
            }
        );
    }

    login(data: LoginInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.login, data);
    };

    getUser(id: number): Observable<AxiosResponse<GetUserInterface>> {
        return this.strapiApiHttpService
            .get<GetUserInterface>(routes.strapiApi.getUser.replace("{id}", id.toString()));
    };

    update(userId: number | string, data: UpdateInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            //@ts-ignore
            .put<UserInterface>(routes.strapiApi.update.replace("{id}", userId), data);
    }

    createCustomer = async (body: CustomerInterface) => {
        return await this.stripe.customers.create({
            name: `${body.name} ${body.surname}`,
            email: body.email,
        })
    };


    register(data: RegisterInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.register, data)
            .pipe(
                switchMap(async user => {
                    console.log(user)
                    const result = await this.createCustomer(data)
                    console.log(result)
                    return {stripeId: result.id, ...user}
                }),
                switchMap(user => {
                    console.log(user)
                    return this.update(user.data.user.id, {stripeId: user.stripeId}).pipe(map(() => user))
                }),
            );
    };

    forgotPassword(data: ForgotPasswordInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.forgotPassword, data);
    };

    resetPassword(data: ResetPasswordInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.resetPassword, data);
    };
}


