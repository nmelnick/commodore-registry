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
import { ModelAttribute } from './entities/ModelAttribute';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => 
        Object.assign(await generateConnectionOptions(), {
          autoLoadEntities: true,
        })
    }),
    TypeOrmModule.forFeature([Attribute, Device, DeviceAttribute, Machine, Model, ModelAttribute, Owner])
  ],
  controllers: [AppController, UpController],
  providers: [AppService],
})
export class AppModule {}
