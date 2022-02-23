import { Controller, Get } from '@nestjs/common';

@Controller('up')
export class UpController {
  @Get()
  up(): string {
    return 'OK';
  }
}
