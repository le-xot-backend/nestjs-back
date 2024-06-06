import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { environments } from './utils/environment';
import { AuthLoggerModule } from './logger/authLogger.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const authLoggerApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AuthLoggerModule,
      {
        transport: Transport.RMQ,
      },
    );

  const config = new DocumentBuilder().setTitle('NestJS Backend').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: `.swagger-ui .topbar { display: none } .version { display: none } .swagger-ui .info .title small.version-stamp { display: none } .swagger-ui .info .title small { display: none }`,
  });

  await app.listen(environments.appPort);
  await authLoggerApp.listen();
}
bootstrap();
