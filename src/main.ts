import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Function to bootstrap the Nest.js application.
 * This function initializes the Nest.js application, sets up global pipes, and generates Swagger documentation.
 */
async function bootstrap() {
  // Create the Nest.js application
  const app = await NestFactory.create(AppModule);

  // Set up global pipes for request validation
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Create Swagger documentation configuration
  const config = new DocumentBuilder()
    .setTitle('MarketPlace')
    .setDescription('The Marketplace API description')
    .setVersion('1.0')
    .addTag('marketplace')
    .build();

  // Generate Swagger documentation
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Start listening on port 8080
  await app.listen(8080);
}
bootstrap();
