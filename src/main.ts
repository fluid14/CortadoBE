import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {InternalServerErrorException, ValidationPipe} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

async function bootstrap() {
    const httpService = new HttpService();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    app.enableCors();

    httpService.axiosRef.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Internal server error exception', error);
            throw new InternalServerErrorException();
        },
    );

    await app.listen(3000);
}

bootstrap();
