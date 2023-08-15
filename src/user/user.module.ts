import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {HttpModule} from "@nestjs/axios";
import {StrapiApiModule} from "../core/api/strapi-api/strapi-api.module";

@Module({
  imports: [HttpModule, StrapiApiModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
