import { PartialType } from '@nestjs/mapped-types';
import { ProductRequestDto } from './product-request.dto';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductRequestDto extends PartialType(ProductRequestDto) {
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return value;
      }
    }
    return value;
  })
  imageIds?: string[];
}
