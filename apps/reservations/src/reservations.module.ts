import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import {
  ConfigModule,
  ConfigService,
  DatabaseModule,
  HealthModule,
  LoggerModule,
  PAYMENT_SERVICE,
} from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  reservationSchema,
} from './Models/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: reservationSchema },
    ]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get('reservations').authHost,
              port: configService.get('reservations').authPort,
            },
          };
        },
      },
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: PAYMENT_SERVICE,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.get('reservations').paymentsHost,
              port: configService.get('reservations').paymentsPort,
            },
          };
        },
      },
    ]),
    HealthModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
