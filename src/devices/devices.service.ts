import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device as DeviceEntity } from '../entities/Device';
import { Machine as MachineEntity } from '../entities/Machine';
import { Model as ModelEntity } from '../entities/Model';
import { Owner as OwnerEntity } from "../entities/Owner";
import { Device } from './Device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(MachineEntity)
    private machineRepository: Repository<MachineEntity>,
    
    @InjectRepository(ModelEntity)
    private modelRepository: Repository<ModelEntity>,
    
    @InjectRepository(DeviceEntity)
    private deviceRepository: Repository<DeviceEntity>,
    
    @InjectRepository(OwnerEntity)
    private ownerRepository: Repository<OwnerEntity>
  ) {
  }

  async getAllDevices(): Promise<Device[]> {
    const devices = await this.deviceRepository.find({});
    return Promise.all(devices.map(async (d) => {
      const model = await this.modelRepository.findOne({ modelId: d.modelId });
      return {
        id: d.deviceId,
        model: { id: model.modelId, name: model.name, machine: await this.machineRepository.findOne({ machineId: model.machineId }).then((m) => ({ id: m.machineId, name: m.name })) },
        owner: await this.ownerRepository.findOne({ ownerId: d.ownerId }).then((o) => ({
          id: o.ownerId,
          name: o.name,
          location: o.location,
        })),
        prefix: d.prefix,
        serialNumber: d.serialNumber,
        description: d.description,
        attributes: []
      } as Device;
    }));
  }
}
