import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  Min,
  ValidateNested,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

import { ProductCategoryEnum } from '../enums/product-category.enum';
import { ProductVariationRequestDto } from './product-variation-request.dto';
import { ProductStatusEnum } from '../enums/product-status.enum';

export class ProductRequestDto {

  @IsString()
  @IsNotEmpty({ message: 'Campo nome vazio' })
  name: string;


  @IsOptional()
  @IsString()
  description?: string;


  @IsEnum(ProductCategoryEnum)
  category: ProductCategoryEnum;


  @IsOptional()
  @IsEnum(ProductStatusEnum)
  status?: ProductStatusEnum;


  // ⚠ CORREÇÃO IMPORTANTE
  @Type(() => Number)
  @IsNumber({}, { message: 'Preço deve ser número' })
  @Min(0, { message: 'Preço não pode ser negativo' })
  price: number;


  // ⚠ CORREÇÃO IMPORTANTE
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Preço promocional deve ser número' })
  @Min(0, { message: 'Preço promocional não pode ser negativo' })
  promoPrice?: number;


  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  isActiveStock: boolean;


  // ⚠ CORREÇÃO IMPORTANTE
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Estoque deve ser inteiro' })
  @Min(0, { message: 'Estoque não pode ser negativo' })
  stock?: number;


  // ⚠ CORREÇÃO IMPORTANTE
  @Type(() => Number)
  @IsInt({ message: 'LowStock deve ser inteiro' })
  @Min(0, { message: 'LowStock não pode ser negativo' })
  lowStock: number;


  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariationRequestDto)
  variations?: ProductVariationRequestDto[];


  @IsOptional()
  @IsUUID()
  supplierId?: string;

}