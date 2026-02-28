import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('images')
export class ImageEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  url: string;


  @Column()
  publicId: string;


  @ManyToOne(
    () => ProductEntity,
    product => product.images,
    { onDelete: 'CASCADE' },
  )
  product: ProductEntity;

}