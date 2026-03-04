import { PartialType } from '@nestjs/mapped-types';
import { ProductRequestDto } from './product-request.dto';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateProductRequestDto extends PartialType(ProductRequestDto) {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  imageIds?: string[];
}
