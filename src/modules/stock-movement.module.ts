import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovementEntity } from 'src/entities/stock-movement.entity';
import { StockMovementController } from 'src/controller/stock-movement.controller';
import { StockMovementService } from 'src/services/stock-movement.service';
import { ProductVariationEntity } from 'src/entities/product-variation.entity';
import { ProductsModule } from 'src/modules/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockMovementEntity, ProductVariationEntity]),
    ProductsModule,
  ],
  controllers: [StockMovementController],
  providers: [StockMovementService],
})
export class StockMovementModule {}
