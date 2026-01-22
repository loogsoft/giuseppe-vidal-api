import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product-entity';
import { ProductRequestDto } from 'src/dtos/request/product-request.dto';
import { UpdateProductRequestDto } from 'src/dtos/request/update-product.dto';
import { ImageService } from './image.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
    private readonly imageService: ImageService,
  ) {}
async create(
  dto: ProductRequestDto,
  files: Express.Multer.File[],
) {
  const product = this.repo.create({
    ...dto,
    price: dto.price.toString(),
    promoPrice: dto.promoPrice?.toString(),
  });

  await this.repo.save(product);

  const images = await this.imageService.saveAll(files, product);

  product.images = images;

  return this.repo.save(product);
}

  findAll() {
    return this.repo.find({
      relations: ['images'],
    });
  }

  async findOne(id: string) {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, dto: UpdateProductRequestDto) {
    const product = await this.findOne(id);

    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.repo.remove(product);

    return { message: 'Produto removido com sucesso' };
  }
}