import { Module, OnModuleInit } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import {StrapiApiHttpService} from "./strapi-api-http.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                timeout: 1000,
                maxRedirects: 2,
                baseURL: configService.get('STRAPI_API_URL'),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${configService.get('STRAPI_API_TOKEN')}`,
                }
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [
        {
            provide: StrapiApiHttpService,
            useExisting: HttpService,
        }
    ],
    exports: [StrapiApiHttpService],
})
export class StrapiApiModule  {
}
