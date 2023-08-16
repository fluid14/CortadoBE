import { Controller, Get, Param, Res, UseGuards,} from '@nestjs/common';
import {ApiKeyAuthGuard} from '../core/auth/guard/apiKeyAuth.guard';
import {Response} from "express";
import {catchError, tap} from "rxjs";
import catchAxiosError from "../core/helpers/catchAxiosError";
import throwAxiosData from "../core/helpers/throwAxiosData";
import {OrderService} from "./order.service";

@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Get('/:id')
    get(@Param('id') id: string, @Res() res: Response) {
        this.orderService.getOrder(parseInt(id))
            .pipe(
                tap((data) => throwAxiosData(data, res)),
                catchError(err => catchAxiosError(err, res))
            )
            .subscribe();
    }
}

