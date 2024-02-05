import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  const _PORT = configService.get('payments').tcpPort;
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: _PORT,
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices().then(() => {
    console.log(
      `Microservice started at port ${_PORT} at ${new Date().toLocaleString()}`,
    );
  });
}
bootstrap();
