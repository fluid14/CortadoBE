import {Injectable} from '@nestjs/common';
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";
import routes from "../routes";
import {catchError, switchMap, tap} from "rxjs";
import throwAxiosData from "../core/helpers/throwAxiosData";
import catchAxiosError from "../core/helpers/catchAxiosError";

@Injectable()
export class SyncService {
    constructor(private strapiApiHttpService: StrapiApiHttpService) {
    }

    updateOrder(data: any) {
        const url = routes.strapiApi.order.get + `?filters[stripeSessionId][$eq]=${data.data.object.id}`;
        switch (data.type) {
            case 'payment_intent.payment_failed':
                this.strapiApiHttpService.get(url)
                    .pipe(
                        tap((data) => throwAxiosData(data)),
                        switchMap(data => this.strapiApiHttpService.put(routes.strapiApi.order.single.replace('{id}', data.data.data[0].id), JSON.stringify({data: {payment: 'failed', status: 'failed'}}))),
                        catchError(err => catchAxiosError(err))
                    )
                    .subscribe()
                break;
            case 'payment_intent.succeeded':
                this.strapiApiHttpService.get(url)
                    .pipe(
                        tap((data) => throwAxiosData(data)),
                        switchMap(data => this.strapiApiHttpService.put(routes.strapiApi.order.single.replace('{id}', data.data.data[0].id), JSON.stringify({data: {payment: 'complete'}}))),
                        catchError(err => catchAxiosError(err))
                    )
                    .subscribe()
                break;
            case 'checkout.session.completed':
                this.strapiApiHttpService.get(url)
                    .pipe(
                        tap((data) => throwAxiosData(data)),
                        switchMap(data => this.strapiApiHttpService.put(routes.strapiApi.order.single.replace('{id}', data.data.data[0].id), JSON.stringify({data: {status: 'complete'}}))),
                        catchError(err => catchAxiosError(err))
                    )
                    .subscribe()
                break;
            default:
                return;
        }
    };
}


