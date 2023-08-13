import { IsString } from 'class-validator';

export class ResetPasswordDto {
    @IsString() code: string;
    @IsString() password: string;
    @IsString() passwordConfirmation: string;
}
