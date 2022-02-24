import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpController } from './up/up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateConnectionOptions } from './Connection';
import { Attribute } from './entities/Attribute';
import { Device } from './entities/Device';
import { DeviceAttribute } from './entities/DeviceAttribute';
import { Machine } from './entities/Machine';
import { Model } from './entities/Model';
import { Owner } from './entities/Owner';
import { MachineAttribute } from './entities/MachineAttribute';
import { MachinesController } from './machines/machines.controller';
import { MachinesService } from './machines/machines.service';
import { DevicesController } from './devices/devices.controller';
import { OwnersController } from './owners/owners.controller';
import { OwnersService } from './owners/owners.service';
import { DevicesService } from './devices/devices.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => 
        Object.assign(await generateConnectionOptions(), {
          autoLoadEntities: true,
        })
    }),
    TypeOrmModule.forFeature([Attribute, Device, DeviceAttribute, Machine, Model, MachineAttribute, Owner])
  ],
  controllers: [AppController, UpController, MachinesController, DevicesController, OwnersController],
  providers: [AppService, MachinesService, OwnersService, DevicesService],
})
export class AppModule {}
