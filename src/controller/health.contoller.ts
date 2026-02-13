import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  findAll() {
    console.log('API is online');
    return 'API ONLINE';
  }
}
