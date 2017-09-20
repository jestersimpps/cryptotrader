import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(bodyParser.json());
  await app.listen(8080);
}
bootstrap();

declare global {
  interface String {
      json(): string;
  }
}

String.prototype.json = function (): string {
  return JSON.parse(this);
}