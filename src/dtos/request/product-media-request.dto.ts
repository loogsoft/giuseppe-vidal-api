import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class ProductMediaRequestDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
