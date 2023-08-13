import {IsString} from 'class-validator';

export class UpdateDto {
  @IsString() username: string;
  @IsString() name: string;
  @IsString() surname: string;
  @IsString() email: string;
}
