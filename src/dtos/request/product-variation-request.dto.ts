import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsInt,
  MaxLength,
  Min,
  IsUrl,
} from 'class-validator';

export class ProductVariationRequestDto {

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;


  @IsInt()
  @Min(0)
  stock: number;


  @IsOptional()
  @IsBoolean()
  isActive?: boolean;


  @IsString()
  @MaxLength(50)
  color: string;


  @IsString()
  @MaxLength(50)
  size: string;


  @IsOptional()
  @IsString()
  imageUrl?: string;

}