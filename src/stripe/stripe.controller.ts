import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';
import { CreateActionDto } from './dto/createAction.dto';
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
}
