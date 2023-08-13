import {Injectable} from '@nestjs/common';
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";

@Injectable()
export class OrderService {
    constructor(private strapiApiHttpService: StrapiApiHttpService) {
    }

    createOrder(data) {
        console.log(data)
        // return this.strapiApiHttpService
        //     .post(routes.strapiApi.login, data);
    };
}


