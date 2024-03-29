import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
// import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';

export class UpdateEventDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly title?: string;

  @IsNotEmpty()
  @IsOptional()
  thumbnail?: {
    path: string;
    imageId: string;
  };

  @IsString()
  @IsNotEmpty()
  readonly description?: string;

  @IsNotEmpty()
  readonly date?: string;

  @IsString()
  readonly time?: string;

  @IsString()
  readonly location?: string;

  @IsEmpty({ message: 'You cannot pass userid' })
  readonly user: User;
}
