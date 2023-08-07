import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import {StripeModule} from "./stripe/stripe.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StripeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
