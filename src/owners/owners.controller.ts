import { Controller, Get } from '@nestjs/common';
import { DataWrapper } from 'src/DataWrapper';
import { Owner } from './Owner.dto';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get()
  async getAllOwners(): Promise<DataWrapper<Owner[]>> {
    return { data: await this.ownersService.getAllOwners() };
  }
}
