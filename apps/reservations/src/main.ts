import { NestFactory } from '@nestjs/core';
import 'colors';
import { ReservationsModule } from './reservations.module';
import { ConfigService } from '@app/common/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  await app.listen(app.get(ConfigService).get('reservations').httpPort);
}
bootstrap();
