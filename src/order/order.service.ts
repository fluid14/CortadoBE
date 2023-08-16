import { Injectable } from '@nestjs/common';
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {GetUserInterface} from "../user/models/get-user.interface";
import routes from "../routes";

@Injectable()
export class OrderService {
    constructor(private strapiApiHttpService: StrapiApiHttpService) {
    }

    getOrder(id: number): Observable<AxiosResponse<any>> {
        return this.strapiApiHttpService
            .get<GetUserInterface>(routes.strapiApi.order.single.replace("{id}", id.toString()));
    };

    cancelOrder(id: number): Observable<AxiosResponse<any>> {
        return this.strapiApiHttpService
            .put<GetUserInterface>(routes.strapiApi.order.single.replace("{id}", id.toString()), {data: {status: 'canceled'}});
    };
}
