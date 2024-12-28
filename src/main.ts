import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initSwaggerDocument } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Swagger
  const openSwagger = configService.get("SWAGGER_ENABLED") === "true";
  if (openSwagger) {
    initSwaggerDocument({
      app,
      configService
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
