import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ProductVariationEntity } from './product-variation.entity';

export enum StockMovementType {
  IN = 'IN',
  OUT = 'OUT',
}

@Entity('stock_movements')
export class StockMovementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductVariationEntity)
  variation: ProductVariationEntity;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: StockMovementType,
  })
  type: StockMovementType;

  @Column()
  reason: string;

  @Column({ nullable: false })
  paymentMethod: string;

  @Column({ nullable: false })
  responsibleName: string;

  @Column({ nullable: false })
  responsibleEmail: string;

  @Column({ nullable: true })
  observation: string;

  @CreateDateColumn()
  createdAt: Date;
}
