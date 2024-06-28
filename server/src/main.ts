import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*', // Replace with your frontend URL during development
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  await app.listen(3000);
}
bootstrap();
