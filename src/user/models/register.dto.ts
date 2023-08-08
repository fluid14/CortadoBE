import {IsBoolean, IsString} from 'class-validator';

export class RegisterDto {
  @IsString() username: string;
  @IsString() name: string;
  @IsString() surname: string;
  @IsString() email: string;
  @IsString() password: string;
}
