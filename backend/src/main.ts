import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception-fliter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // logger
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}

bootstrap();
