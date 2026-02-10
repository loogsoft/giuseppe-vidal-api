import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyCoderequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  code: string;
}
