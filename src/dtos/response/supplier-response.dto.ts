import { Expose } from 'class-transformer';

export class SupplierResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email?: string;

  @Expose()
  phone?: string;
}
