import { OrderStatusEnum } from 'src/dtos/enums/order-status.enum';
import { PaymentMethodEnum } from 'src/dtos/enums/payment-method.enum';
import { OrderItem } from 'src/types/order-Item-type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';



type OrderHistory = {
  status: OrderStatusEnum;
  label: string;
  time?: string;
  createdAt: string;
};

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'bigint', unique: true })
  code: string;

  @Index()
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.RECEIVED,
  })
  status: OrderStatusEnum;

  @Column({ type: 'enum', enum: PaymentMethodEnum })
  paymentMethod: PaymentMethodEnum;

  @Column({ type: 'varchar', length: 40, nullable: true })
  paymentCardLast4?: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  paymentCardBrand?: string;

  @Column({ type: 'varchar', length: 160 })
  customerName: string;

  @Column({ type: 'varchar', length: 30 })
  customerPhone: string;

  @Column({ type: 'varchar', length: 200 })
  addressStreet: string;

  @Column({ type: 'varchar', length: 140 })
  addressCityState: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  addressComplement?: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  subtotal: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  deliveryFee: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  discount: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  total: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  items: OrderItem[];

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  history: OrderHistory[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
