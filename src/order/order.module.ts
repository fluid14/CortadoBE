import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {HttpModule} from "@nestjs/axios";
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";

@Module({
  imports: [HttpModule, StrapiApiModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
