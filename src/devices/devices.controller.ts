import { Controller, Get } from '@nestjs/common';
import { DataWrapper } from 'src/DataWrapper';
import { Device } from './Device.dto';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getDevices(): Promise<DataWrapper<Device[]>> {
    return { data: await this.devicesService.getAllDevices() };
  }
}
