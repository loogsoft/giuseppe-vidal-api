import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierRequestDto } from 'src/dtos/request/supplier-request.dto';
import { SupplierEntity } from 'src/entities/supplier.entity';
import { Repository } from 'typeorm';
import { toLogString } from 'src/utils/logging';

@Injectable()
export class SuppliersService {
  private readonly logger = new Logger(SuppliersService.name);

  constructor(
    @InjectRepository(SupplierEntity)
    private readonly repo: Repository<SupplierEntity>,
  ) {}

  async create(dto: SupplierRequestDto) {
    this.logger.log(`create:start ${toLogString({ dto })}`);

    try {
      const supplier = this.repo.create(dto);
      const savedSupplier = await this.repo.save(supplier);

      this.logger.log(
        `create:success ${toLogString({ id: savedSupplier.id })}`,
      );

      return savedSupplier;
    } catch (err) {
      const errorStack = err instanceof Error ? err.stack : String(err);
      this.logger.error('create:error', errorStack);
      throw err;
    }
  }

  async findAll() {
    this.logger.log('findAll:start');

    try {
      const suppliers = await this.repo.find();

      this.logger.log(
        `findAll:success ${toLogString({ count: suppliers.length })}`,
      );

      return suppliers;
    } catch (err) {
      const errorStack = err instanceof Error ? err.stack : String(err);
      this.logger.error('findAll:error', errorStack);
      throw err;
    }
  }

  async findOne(id: string) {
    this.logger.log(`findOne:start ${toLogString({ id })}`);

    try {
      const supplier = await this.repo.findOne({ where: { id } });

      this.logger.log(`findOne:success ${toLogString({ id })}`);

      return supplier;
    } catch (err) {
      const errorStack = err instanceof Error ? err.stack : String(err);
      this.logger.error('findOne:error', errorStack);
      throw err;
    }
  }
  async remove(id: string) {
    this.logger.log(`remove:start ${toLogString({ id })}`);

    try {
      const result = await this.repo.delete(id);

      if (!result.affected) {
        throw new NotFoundException('Produto não encontrado');
      }

      this.logger.log(`remove:success ${toLogString({ id })}`);

      return { message: 'Produto removido com sucesso' };
    } catch (err) {
      const errorStack = err instanceof Error ? err.stack : String(err);
      this.logger.error('remove:error', errorStack);
      throw err;
    }
  }
}
