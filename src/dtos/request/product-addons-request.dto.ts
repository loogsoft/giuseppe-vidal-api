import {
  IsUUID,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class ProductAddonRequestDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
