import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SupplierRequestDto } from 'src/dtos/request/supplier-request.dto';
import { SuppliersService } from 'src/services/supplier.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly service: SuppliersService) {}

  @Post()
  create(@Body() dto: SupplierRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
