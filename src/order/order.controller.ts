import {Body, Controller, Post, Res, UseGuards,} from '@nestjs/common';
import {OrderService} from './order.service';
import {ApiKeyAuthGuard} from '../core/auth/guard/apiKeyAuth.guard';
import {Response} from "express";

@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post('/new')
    createOrder(@Body() body, @Res() res: Response) {
        console.log(body)
        // this.orderService.createOrder(body)
        res.status(200);
        res.send({message: 'Order created'})
    }
}

