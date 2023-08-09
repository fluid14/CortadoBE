import {
  Body,
  Controller, Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { ApiKeyAuthGuard } from '../core/auth/guard/apiKeyAuth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('/create-session')
  async createAction(@Body() body: any, @Res() res: Response) {
    const result = await this.stripeService.createSession(body);
    res.send({ result });
  }

  @Get('/shipping-methods')
  async getShippingMethods(@Res() res: Response) {
    const result = await this.stripeService.getShippingMethods();
    res.send({ result });
  }
}
