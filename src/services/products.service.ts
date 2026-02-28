import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { ProductEntity } from 'src/entities/product.entity';

import { SupplierEntity } from 'src/entities/supplier.entity';

import { ProductVariationEntity } from 'src/entities/product-variation.entity';

import { ProductRequestDto } from 'src/dtos/request/product-request.dto';

import { UpdateProductRequestDto } from 'src/dtos/request/update-product.dto';

import { ImageService } from 'src/services/image.service';

import { toLogString } from 'src/utils/logging';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,

    @InjectRepository(SupplierEntity)
    private readonly supplierRepo: Repository<SupplierEntity>,

    private readonly imageService: ImageService,
  ) {}

  // CREATE PRODUCT
  async create(dto: ProductRequestDto, files?: Express.Multer.File[]) {
    this.logger.log(`create:start ${toLogString({ dto })}`);

    try {
      let supplier: SupplierEntity | null = null;

      if (dto.supplierId) {
        supplier = await this.supplierRepo.findOne({
          where: { id: dto.supplierId },
        });

        if (!supplier) throw new NotFoundException('Fornecedor não encontrado');
      }

      const { variations, supplierId, ...dtoWithoutVariations } = dto;

      // UPLOAD IMAGENS CLOUDINARY
      const images = await this.imageService.createImages(files ?? []);

      const product = this.repo.create({
        ...dtoWithoutVariations,

        price: dto.price.toString(),

        promoPrice: dto.promoPrice?.toString(),

        supplier: supplier ?? undefined,

        images: images,

        variations: variations
          ? variations.map((v) =>
              Object.assign(new ProductVariationEntity(), {
                price: v.price?.toString(),
                stock: v.stock,
                color: v.color,
                size: v.size,
                imageUrl: v.imageUrl, // ✅
                isActive: v.isActive ?? true,
              }),
            )
          : [],
      });

      const savedProduct = await this.repo.save(product);

      this.logger.log(
        `create:success ${toLogString({
          id: savedProduct.id,
        })}`,
      );

      return await this.findOne(savedProduct.id);
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  // FIND ALL
  async findAll() {
    return await this.repo.find({
      relations: {
        images: true,
        supplier: true,
        variations: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    const product = await this.repo.findOne({
      where: { id },

      relations: {
        images: true,
        supplier: true,
        variations: true,
      },
    });

    if (!product) throw new NotFoundException('Produto não encontrado');

    return product;
  }

  // UPDATE
  async update(
    id: string,
    dto: UpdateProductRequestDto,
    files?: Express.Multer.File[],
  ) {
    const product = await this.findOne(id);

    if (files && files.length > 0) {
      const newImages = await this.imageService.createImages(files);

      product.images = [...product.images, ...newImages];
    }

    Object.assign(product, {
      ...dto,

      price: dto.price?.toString(),

      promoPrice: dto.promoPrice?.toString(),
    });

    return await this.repo.save(product);
  }

  // DELETE
  async remove(id: string) {
    const product = await this.findOne(id);

    await this.repo.remove(product);

    return {
      message: 'Produto deletado com sucesso',
    };
  }
}
