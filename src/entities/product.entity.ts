import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';
import { ProductCategoryEnum } from 'src/dtos/enums/product-category.enum';
import { ProductStatusEnum } from 'src/dtos/enums/product-status.enum';
import { SupplierEntity } from './supplier.entity';
import { ProductVariationEntity } from './product-variation.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 180 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @Column({ type: 'enum', enum: ProductCategoryEnum })
  category: ProductCategoryEnum;

  @Column({
    type: 'enum',
    enum: ProductStatusEnum,
    default: ProductStatusEnum.ACTIVED,
  })
  status: ProductStatusEnum;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  promoPrice?: string;

  @Column({ default: true })
  isActiveStock: boolean;

  // Só usar se NÃO tiver variação
  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => ImageEntity, (image) => image.product, {
    cascade: true,
  })
  images: ImageEntity[];

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier?: SupplierEntity;

  @OneToMany(() => ProductVariationEntity, (variation) => variation.product, {
    cascade: true,
  })
  variations: ProductVariationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
