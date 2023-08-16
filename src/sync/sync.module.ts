import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import {HttpModule} from "@nestjs/axios";
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";

@Module({
  imports: [HttpModule, StrapiApiModule],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
