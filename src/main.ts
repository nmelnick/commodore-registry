import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as requestIp from "request-ip";
import { Logger } from 'tslog';
import { AppModule } from './app.module';
import { NestTsLogger } from './nest/NestTsLogger';

const log = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new NestTsLogger(),
  });

  // Use request-ip middleware
  app.use(requestIp.mw());

  // Enable validation for all routes
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Commodore Registry')
    .setDescription('The Commodore Registry API description')
    .setVersion('1.0')
    .addTag('cr')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  log.info(`Starting application on port 3500`);
  await app.listen(3500);
}
bootstrap();
