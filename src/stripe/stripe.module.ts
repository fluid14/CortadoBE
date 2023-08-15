import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {StrapiApiHttpService} from "../core/api/strapi-api/strapi-api-http.service";

@Module({
  imports: [StrapiApiModule, UserModule],
  controllers: [StripeController],
  providers: [StripeService, UserService],
})
export class StripeModule {}
