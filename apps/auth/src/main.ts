import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  const PORT = app.get(ConfigService).get('auth').port;
  await app.listen(PORT, () => {
    console.log(
      `Server is active and listening on port ${PORT} at ${
        app.get(ConfigService).get('auth').api
      } as of ${new Date().toLocaleString()}`,
    );
  });
}
bootstrap();
