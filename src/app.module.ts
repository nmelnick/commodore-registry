import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpController } from './up/up.controller';

@Module({
  imports: [],
  controllers: [AppController, UpController],
  providers: [AppService],
})
export class AppModule {}
