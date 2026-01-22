import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
