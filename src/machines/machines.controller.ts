import { Controller, Get, Param } from '@nestjs/common';
import { DataWrapper } from '../DataWrapper';
import { Machine } from './Machine.dto';
import { MachinesService } from './machines.service';
import { Model } from './Model.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get()
  async machines(): Promise<DataWrapper<Machine[]>> {
    return { data: await this.machinesService.getAllMachines() };
  }

  @Get(':machine')
  async modelsForMachine(@Param() params): Promise<DataWrapper<Model[]>> {
    return { data: await this.machinesService.getAllModelsForMachine(params.machine) };
  }
}
