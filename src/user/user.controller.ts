import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiKeyAuthGuard } from '../core/auth/guard/apiKeyAuth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('stripe')
export class UserController {
  constructor(private userService: UserService) {}
}
