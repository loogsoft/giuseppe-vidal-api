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
import { ProductVariationRequestDto } from './product-variation-request.dto';
import { ProductStatusEnum } from '../enums/product-status.enum';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { ManyToOne, JoinColumn, Column } from 'typeorm';
import { SupplierRequestDto } from './supplier-request.dto';

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

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  promoPrice?: number;

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  isActiveStock: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariationRequestDto)
  variations?: ProductVariationRequestDto[];

  @ManyToOne(() => SupplierEntity, { nullable: true })
  @JoinColumn({ name: 'supplierId' }) // 🔥 ESSA LINHA É OBRIGATÓRIA
  supplier: SupplierRequestDto;

  @Column({ nullable: true })
  supplierId: string;
}
