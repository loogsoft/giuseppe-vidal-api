import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierRequestDto } from 'src/dtos/request/supplier-request.dto';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly repo: Repository<SupplierEntity>,
  ) {}

  async create(dto: SupplierRequestDto) {
    const supplier = this.repo.create(dto);
    return this.repo.save(supplier);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
  async remove(id: string) {
    const result = await this.repo.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Produto não encontrado');
    }

    return { message: 'Produto removido com sucesso' };
  }
}
