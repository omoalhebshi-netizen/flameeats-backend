import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*', credentials: false });
  app.setGlobalPrefix('v1');

  const port = process.env.PORT || 3000;
await app.listen(port, '0.0.0.0');
  console.log(`🔥 FlameEats API running on port ${port}`);
}
bootstrap();