import {Injectable} from '@nestjs/common';
import {concatMap, defer, EMPTY, from, map, Observable, switchMap, tap} from "rxjs";
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import routes from "../routes";
import {UserInterface} from "./models/user.interface";
import {AxiosResponse} from 'axios';
import {StripeService} from "../stripe/stripe.service";

@Injectable()
export class UserService {
    constructor(private strapiApiHttpService: StrapiApiHttpService, private stripeService: StripeService) {
    }

    login(data): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            .post<UserInterface>(routes.strapiApi.login, data);
    };

    update(userId: number | string, data): Observable<AxiosResponse<UserInterface>> {
        return this.strapiApiHttpService
            //@ts-ignore
            .put<UserInterface>(routes.strapiApi.update.replace("{id}", userId), data);
    }

    register(data): Observable<AxiosResponse<UserInterface>> {
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
}


