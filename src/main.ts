import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as requestIp from "request-ip";
import { Logger } from 'tslog';
import { AppModule } from './app.module';
import { config } from "./Config";
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

  const documentConfig = new DocumentBuilder()
    .setTitle('Commodore Registry')
    .setDescription('The Commodore Registry API description')
    .setVersion('1.0')
    .addTag('cr')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  log.info(`Starting application on port ${config.port}}`);
  await app.listen(config.port);
}
bootstrap();
