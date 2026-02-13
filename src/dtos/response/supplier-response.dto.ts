import { Expose } from 'class-transformer';

export class SupplierResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  category?: string;

  @Expose()
  email?: string;

  @Expose()
  phone?: string;

  @Expose()
  location?: string;

  @Expose()
  status?: string;

  @Expose()
  avatarColor?: string;

  @Expose()
  openOrders?: number;
}
