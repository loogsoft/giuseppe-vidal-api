import { IsString, IsOptional, IsEmail, MaxLength } from 'class-validator';

export class SupplierRequestDto {
  @IsString()
  @MaxLength(180)
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
