import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute as AttributeEntity } from '../entities/Attribute';
import { Machine as MachineEntity } from '../entities/Machine';
import { MachineAttribute as MachineAttributeEntity } from '../entities/MachineAttribute';
import { Model as ModelEntity } from '../entities/Model';
import { Logger } from 'tslog';
import { Repository } from 'typeorm';
import { Machine } from './Machine.dto';
import { Model } from './Model.dto';

const log = new Logger();

@Injectable()
export class MachinesService {

  constructor(
    @InjectRepository(MachineEntity)
    private machineRepository: Repository<MachineEntity>,
    
    @InjectRepository(ModelEntity)
    private modelRepository: Repository<ModelEntity>,
    
    @InjectRepository(MachineAttributeEntity)
    private machineAttributeRepository: Repository<MachineAttributeEntity>,
    
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>,
  ) {
  }

  async getAllMachines(): Promise<Machine[]> {
    return (await this.machineRepository.find({})).map((m) => ({ id: m.machineId, name: m.name }));
  }
  
  async getAllModelsForMachine(machineId: number): Promise<Model[]> {
    const machine = await this.machineRepository.findOne({ machineId: machineId }).then((m) => ({ id: m.machineId, name: m.name }));
    return (await this.modelRepository.find({ machineId: machineId })).map((m) => ({ id: m.modelId, name: m.name, machine: machine }));
  }
}
