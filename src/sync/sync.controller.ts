import {Body, Controller, Post, Res} from '@nestjs/common';
import {SyncService} from './sync.service';
import {Response} from "express";

@Controller('sync')
export class SyncController {
    constructor(private orderService: SyncService) {
    }

    @Post('/order')
    updateOrder(@Body() body, @Res() res: Response) {
        this.orderService.updateOrder(body)
        res.status(200);
        res.send({message: 'Order updated'})
    }
}

