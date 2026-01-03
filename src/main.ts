import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API for managing products')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger page at /api

  await app.listen(process.env.PORT ?? 3000);
  console.log('Server running on http://localhost:3000');
  console.log('Swagger UI available at http://localhost:3000/api');

  // : open automatically in default browser
  const open = require('open');
  //await open('http://localhost:3000/api');
}
bootstrap();
