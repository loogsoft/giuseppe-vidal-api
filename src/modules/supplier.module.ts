import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { SuppliersService } from 'src/services/supplier.service';
import { SuppliersController } from 'src/controller/supplier.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity]), // 🔥 registra o repositório
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService], // 🔥 permite usar em outros módulos (ex: ProductsModule)
})
export class SuppliersModule {}
