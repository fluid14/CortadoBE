import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.configService.get<string>('API_KEY');
  }
}
