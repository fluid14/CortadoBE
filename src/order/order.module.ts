import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";

@Module({
  imports: [StrapiApiModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
