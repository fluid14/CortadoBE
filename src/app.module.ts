import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './core/auth/auth.module';
import {StripeModule} from "./stripe/stripe.module";
import {UserModule} from "./user/user.module";
import {APP_FILTER} from "@nestjs/core";
import {HttpExceptionFilter} from "./core/http-exception.filter";
import {HttpModule} from "@nestjs/axios";
import {StrapiApiModule} from "./core/api/strapi-api/strapi-api.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        HttpModule,
        StrapiApiModule,
        StripeModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
    }],
})
export class AppModule {
}
