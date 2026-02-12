import { Module } from '@nestjs/common';
import { HealthController } from 'src/controller/health.contoller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class HealthModule {}
