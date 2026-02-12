import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/controller/products.controller';
import { ImageEntity } from 'src/entities/image.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { ProductVariationEntity } from 'src/entities/product-variation.entity';
import { ImageService } from 'src/services/image.service';
import { ProductsService } from 'src/services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ImageEntity,
      SupplierEntity,
      ProductVariationEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ImageService],
  exports: [ProductsService],
})
export class ProductsModule {}
