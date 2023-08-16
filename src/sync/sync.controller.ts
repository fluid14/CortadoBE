import {Body, Controller, Post, Res, UseGuards,} from '@nestjs/common';
import {OrderService} from './order.service';
import {Response} from "express";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post('/update')
    updateOrder(@Body() body, @Res() res: Response) {
        this.orderService.updateOrder(body)
        res.status(200);
        res.send({message: 'Order updated'})
    }
}
