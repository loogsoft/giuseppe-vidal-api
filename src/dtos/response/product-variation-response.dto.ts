import { Expose } from 'class-transformer';

export class ProductVariationResponseDto {

  @Expose()
  id: string;


  @Expose()
  name: string;


  @Expose()
  price?: string;


  @Expose()
  stock: number;


  @Expose()
  isActive: boolean;


  @Expose()
  color: string;


  @Expose()
  size: string;


  // ✅ NOVO CAMPO IMAGEM
  @Expose()
  imageUrl?: string;


  @Expose()
  createdAt: Date;


  @Expose()
  updatedAt: Date;

}