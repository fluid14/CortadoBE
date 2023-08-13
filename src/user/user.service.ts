import {Injectable} from '@nestjs/common';
import {map, Observable, switchMap} from "rxjs";
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import routes from "../routes";
import {UserInterface} from "./models/user.interface";
import {AxiosResponse} from 'axios';
import {StripeService} from "../stripe/stripe.service";
import {ForgotPasswordInterface} from "./models/forgot-password.interface";
import {RegisterInterface} from "./models/register.interface";
import {UpdateInterface} from "./models/update.interface";
import {LoginInterface} from "./models/login.interface";
import {ResetPasswordInterface} from "./models/reset-password.interface";

@Injectable()
export class UserService {
    constructor(private strapiApiHttpService: StrapiApiHttpService, private stripeService: StripeService) {
    }

    login(data: LoginInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.login, data);
    };

    update(userId: number | string, data: UpdateInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            //@ts-ignore
            .put<UserInterface>(routes.strapiApi.update.replace("{id}", userId), data);
    }

    register(data: RegisterInterface): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.register, data)
            .pipe(
                switchMap(async user => {
                    const result = await this.stripeService.createCustomer(data)
                    return {stripeId: result.id, ...user}
                }),
                switchMap(user => {
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


