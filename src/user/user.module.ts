import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {HttpModule} from "@nestjs/axios";
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";
import {StripeService} from "../stripe/stripe.service";

@Module({
  imports: [HttpModule, StrapiApiModule],
  controllers: [UserController],
  providers: [UserService, StripeService],
})
export class UserModule {}
