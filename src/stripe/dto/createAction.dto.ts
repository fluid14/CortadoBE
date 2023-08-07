import { IsString } from 'class-validator';

export class CreateActionDto {
  @IsString() icon: string;
  @IsString() tags: string;
  @IsString() description: string;
  @IsString() shortcut: string;
  @IsString() title: string;
  @IsString() userDescription: string;
  @IsString() category: string;
}
