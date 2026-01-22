import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { ProductStatusEnum } from 'src/dtos/enums/product-status.enum';
import { ProductRequestDto } from 'src/dtos/request/product-request.dto';
import { UpdateProductRequestDto } from 'src/dtos/request/update-product.dto';
import { ProductResponseDto } from 'src/dtos/response/product-response.dto';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() dto: ProductRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const product = await this.productsService.create(dto, files);
    console.log("Valores do meu product", dto)
    return plainToInstance(ProductResponseDto, product);
  }
  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    console.log(products);
    return plainToInstance(ProductResponseDto, products);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return plainToInstance(ProductResponseDto, product);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductRequestDto) {
    const product = await this.productsService.update(id, dto);
    return plainToInstance(ProductResponseDto, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Patch(':id/status')
  actived(@Param('id') id: string, @Body('status') status: ProductStatusEnum) {
    return this.productsService.actived(id, status);
  }
}
