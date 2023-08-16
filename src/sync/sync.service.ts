import {Injectable} from '@nestjs/common';
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import routes from "../routes";
import {catchError, switchMap, tap} from "rxjs";
import throwAxiosData from "../core/helpers/throwAxiosData";
import catchAxiosError from "../core/helpers/catchAxiosError";

@Injectable()
export class OrderService {
    constructor(private strapiApiHttpService: StrapiApiHttpService) {
    }

    updateOrder(data: any) {
        switch (data.type) {
            case 'checkout.session.async_payment_failed':
                this.strapiApiHttpService.get(routes.strapiApi.order.get + `?filters[stripeSessionId][$eq]=${data.data.object.id}`)
                    .pipe(
                        tap((data) => throwAxiosData(data)),
                        switchMap(data => this.strapiApiHttpService.put(routes.strapiApi.order.update.replace('{id}', data.data.data[0].id), JSON.stringify({data: {payment: 'failed', status: 'failed'}}))),
                        catchError(err => catchAxiosError(err))
                    )
                    .subscribe()
                break;
            case 'checkout.session.async_payment_succeeded':
                this.strapiApiHttpService.get(routes.strapiApi.order.get + `?filters[stripeSessionId][$eq]=${data.data.object.id}`)
                    .pipe(
                        tap((data) => throwAxiosData(data)),
                        switchMap(data => this.strapiApiHttpService.put(routes.strapiApi.order.update.replace('{id}', data.data.data[0].id), JSON.stringify({data: {payment: 'complete', status: 'complete'}}))),
                        catchError(err => catchAxiosError(err))
                    )
                    .subscribe()
                break;
            default:
                return;
        }
    };
}


