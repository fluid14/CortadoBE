import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {InternalServerErrorException, ValidationPipe} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {HttpExceptionFilter} from "./core/http-exception.filter";

async function bootstrap() {
    const httpService = new HttpService();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    app.enableCors();

    app.useGlobalFilters(new HttpExceptionFilter());

    httpService.axiosRef.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            throw new InternalServerErrorException();
        },
    );

    await app.listen(3000);
}

bootstrap();
