import { Expose, Type } from 'class-transformer';
import { ProductCategoryEnum } from '../enums/product-category.enum';
import { ProductAddonRequestDto } from '../request/product-addons-request.dto';
import { ProductImageResponseDto } from './product-images-response.tdo';
import { ProductStatusEnum } from '../enums/product-status.enum';

export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  category: ProductCategoryEnum;

  @Expose()
  isActive: ProductStatusEnum;

  @Expose()
  price: string;

  @Expose()
  promoPrice?: string;

  @Expose()
  stockEnabled: boolean;

  @Expose()
  stock?: number;

  @Expose()
  @Type(() => ProductImageResponseDto)
  images: ProductImageResponseDto[];

  @Expose()
  addons?: ProductAddonRequestDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
