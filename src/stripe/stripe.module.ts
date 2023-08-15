import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";

@Module({
  imports: [StrapiApiModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
