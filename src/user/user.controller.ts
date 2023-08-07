import {
  Body,
  Controller, Get, Post, Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiKeyAuthGuard } from '../core/auth/guard/apiKeyAuth.guard';
import {Response} from "express";
import {tap} from "rxjs";

@UseGuards(ApiKeyAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('/login')
  async createAction(@Res() res: Response) {
    this.userService.loginUser(null).pipe(tap(response => res.send({ result: response })));
  }
}
