import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';
import 'dotenv/config';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.API_PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // const DOC_API = await readFile(
  //   join(
  //     'D:\\projects\\node-js-course\\nodejs2022Q2-service',
  //     'doc',
  //     'api.yaml',
  //   ),
  //   'utf-8',
  // );
  // const document = parse(DOC_API);
  //
  // SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
