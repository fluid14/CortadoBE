import { Module } from '@nestjs/common';
import { SyncController } from './order.controller';
import { OrderService } from './order.service';
import {HttpModule} from "@nestjs/axios";
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";

@Module({
  imports: [HttpModule, StrapiApiModule],
  controllers: [SyncController],
  providers: [OrderService],
})
export class OrderModule {}
