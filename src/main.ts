import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageFile = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(`WeFit Form - ${process.env.NODE_ENV}`)
    .setDescription('Back-end responsible for managing form data')
    .setVersion(packageFile.version)
    .addBearerAuth()
    .addTag('Back-end')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const PORT = Number(process.env.PORT) || 3000;
  await app.listen(PORT, '0.0.0.0');
  console.log(
    `${packageFile.name} is running on ${process.env.NODE_ENV} mode and is listening port : `,
    PORT,
  );
}
bootstrap();
