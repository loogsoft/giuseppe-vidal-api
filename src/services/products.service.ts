import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductRequestDto } from 'src/dtos/request/product-request.dto';
import { UpdateProductRequestDto } from 'src/dtos/request/update-product.dto';
import { ProductStatusEnum } from 'src/dtos/enums/product-status.enum';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { ProductVariationEntity } from 'src/entities/product-variation.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,

    @InjectRepository(SupplierEntity)
    private readonly supplierRepo: Repository<SupplierEntity>,
  ) {}

  /* =====================================================
      CREATE (MANTIDO COMO VOCÊ FEZ)
  ===================================================== */

  async create(dto: ProductRequestDto /* files?: Express.Multer.File[] */) {
    let supplier: SupplierEntity | null = null;

    if (dto.supplierId) {
      supplier = await this.supplierRepo.findOne({
        where: { id: dto.supplierId },
      });

      if (!supplier) {
        throw new NotFoundException('Fornecedor não encontrado');
      }
    }

    const { variations, supplierId, ...dtoWithoutVariations } = dto;

    const product = this.repo.create({
      ...dtoWithoutVariations,
      price: dto.price.toString(),
      promoPrice: dto.promoPrice?.toString(),

      // 🔥 Forçando salvar o id

      // 🔥 Mantendo relação
      supplier: supplier ?? undefined,

      variations: variations
        ? variations.map((v) =>
            Object.assign(new ProductVariationEntity(), {
              name: v.name,
              price: v.price?.toString(),
              stock: v.stock,
              color: v.color,
              size: v.size,
              isActive: v.isActive ?? true,
            }),
          )
        : [],
    });

    const savedProduct = await this.repo.save(product);

    return this.findOne(savedProduct.id);
  }

  /* =====================================================
      FIND ALL
  ===================================================== */

  async findAll() {
    return this.repo.find({
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

  /* =====================================================
      FIND ONE
  ===================================================== */

  async findOne(id: string) {
    const product = await this.repo.findOne({
      where: { id },
      relations: {
        images: true,
        supplier: true,
        variations: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  /* =====================================================
      UPDATE
  ===================================================== */

  async update(id: string, dto: UpdateProductRequestDto) {
    const product = await this.findOne(id);

    // Atualiza variações se vier no DTO
    if (dto.variations) {
      product.variations = dto.variations.map((v) =>
        Object.assign(new ProductVariationEntity(), {
          name: v.name,
          price: v.price?.toString(),
          stock: v.stock,
          color: v.color,
          size: v.size,
          isActive: v.isActive ?? true,
        }),
      );
    }

    Object.assign(product, {
      ...dto,
      price: dto.price?.toString(),
      promoPrice: dto.promoPrice?.toString(),
    });

    await this.repo.save(product);

    return this.findOne(id);
  }

  /* =====================================================
      REMOVE
  ===================================================== */

  async remove(id: string) {
    const result = await this.repo.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Produto não encontrado');
    }

    return { message: 'Produto removido com sucesso' };
  }

  /* =====================================================
      CHANGE STATUS
  ===================================================== */

  async changeStatus(id: string, status: ProductStatusEnum) {
    const product = await this.findOne(id);

    product.status = status;

    await this.repo.save(product);

    return { message: `Produto ${status}` };
  }
}
