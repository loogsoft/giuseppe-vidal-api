import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './modules/products.module';
import { UserModule } from './modules/user.module';
import { EmailModule } from './modules/email.module';
import { SuppliersModule } from './modules/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),

    ProductsModule,
    UserModule,
    EmailModule,
    SuppliersModule,
  ],
})
export class AppModule {}
