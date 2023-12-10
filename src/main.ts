import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  app.useGlobalPipes(new ValidationPipe());
  const PORT = configService.get('PORT');
  const SWAGGER_PATH = configService.get('SWAGGER_PATH');

  const config = new DocumentBuilder()
    .setTitle('UAS SE Movie REST API Documentations')
    .setDescription('untuk matakuliah software engineer')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter Jwt Token',
        in: 'header',
      },
      'JWTAUTH',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  console.log(
    '======================================================================',
  );
  console.log(`Server Berjalan DI : http://localhost:${PORT}/`);
  console.log(`Swagger Berjalan DI : http://localhost:${PORT}/${SWAGGER_PATH}`);
  console.log(
    '======================================================================',
  );
}
bootstrap();
