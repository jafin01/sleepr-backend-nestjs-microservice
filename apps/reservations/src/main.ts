import { NestFactory } from '@nestjs/core';
import 'colors';
import { ReservationsModule } from './reservations.module';
import { ConfigService } from '@app/common/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.listen(app.get(ConfigService).get('reservations').httpPort, () =>
    console.log(
      `Server is active and listening on port ${
        app.get(ConfigService).get('reservations').httpPort
      } at ${
        app.get(ConfigService).get('reservations').httpHost
      } as of ${new Date().toLocaleString()}`.cyan.underline,
    ),
  );
}
bootstrap();
