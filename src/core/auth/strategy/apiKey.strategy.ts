import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'apiKey',
) {
  constructor(private authService: AuthService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      const isValid = this.authService.validateApiKey(apiKey);
      if (!isValid) {
        return done('Unauthorized', false);
      }
      return done(null, true);
    });
  }
}
