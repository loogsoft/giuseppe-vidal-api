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
} from 'class-validator';
import { ProductCategoryEnum } from '../enums/product-category.enum';
import { ProductAddonRequestDto } from './product-addons-request.dto';
import { ProductStatusEnum } from '../enums/product-status.enum';

export class ProductRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome fazio' })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Campo descrição vazio' })
  description?: string;

  @IsEnum(ProductCategoryEnum)
  @IsNotEmpty({ message: 'Campo categoria vazio' })
  category: ProductCategoryEnum;

  @IsOptional()
  @IsEnum(ProductStatusEnum)
  isActive?: ProductStatusEnum;

  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: 'Campo price vazio' })
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  promoPrice?: number;

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  stockEnabled: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAddonRequestDto)
  addons?: ProductAddonRequestDto[];
}
