import { NestFactory } from '@nestjs/core';
import 'colors';
import { ReservationsModule } from './reservations.module';
import { ConfigService } from '@app/common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  await app.listen(app.get(ConfigService).get('port'), () =>
    console.log(
      `Server is active and listening on port ${app
        .get(ConfigService)
        .get('port')} at ${
        app.get(ConfigService).get('api').apiUrl
      } as of ${new Date().toLocaleString()}`.cyan.underline,
    ),
  );
}
bootstrap();
