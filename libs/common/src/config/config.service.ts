import { Injectable } from '@nestjs/common';
import {
  AuthProps,
  ConfigProps,
  NotificationProps,
  PaymentProps,
  ReservationProps,
} from './config.interface';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigProps;
  private currentServiceName = process.env.SERVICE_NAME;

  constructor() {
    const serviceName = process.env.SERVICE_NAME;
    console.log('serviceName', serviceName);
    switch (serviceName) {
      case 'reservations':
        this.envConfig = {
          reservations: this.loadReservationsConfig(),
        };
        break;
      case 'auth':
        this.envConfig = {
          auth: this.loadAuthConfig(),
        };
        break;
      case 'payments':
        this.envConfig = {
          payments: this.loadPaymentConfig(),
        };
        break;
      case 'notifications':
        this.envConfig = {
          notifications: this.loadNotificationConfig(),
        };
        break;
      default:
        throw new Error(
          `Config error - ${serviceName} is not a valid service name`,
        );
    }
  }

  private loadReservationsConfig(): ReservationProps {
    const schema = Joi.object({
      SERVICE_NAME: Joi.string().required(),
      HTTP_PORT: Joi.number().required(),
      HTTP_TIMEOUT: Joi.number().default(1000),
      AUTH_PORT: Joi.number().required(),
      AUTH_HOST: Joi.string().required(),
      PAYMENTS_PORT: Joi.number().required(),
      PAYMENTS_HOST: Joi.string().required(),
      HTTP_HOST: Joi.string().required(),
      MONGODB_URI: Joi.string().required(),
      MONGODB_DATABASE_NAME: Joi.string().default('local'),
    });

    const { error, value: envVars } = schema.validate(process.env, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return {
      httpPort: parseInt(envVars.HTTP_PORT, 10),
      httpHost: envVars.HTTP_HOST,
      httpTimeout: parseInt(envVars.HTTP_TIMEOUT, 10),
      authPort: parseInt(envVars.AUTH_PORT, 10),
      authHost: envVars.AUTH_HOST,
      paymentsPort: parseInt(envVars.PAYMENTS_PORT, 10),
      paymentsHost: envVars.PAYMENTS_HOST,
      databases: {
        mongodb: {
          uri: envVars.MONGODB_URI,
          name: envVars.MONGODB_DATABASE_NAME,
        },
      },
    };
  }

  private loadAuthConfig(): AuthProps {
    const schema = Joi.object({
      SERVICE_NAME: Joi.string().required(),
      HTTP_PORT: Joi.number().required(),
      TCP_PORT: Joi.number().required(),
      HTTP_TIMEOUT: Joi.number().default(1000),
      HTTP_HOST: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.string().required(),
      MONGODB_URI: Joi.string().required(),
      MONGODB_DATABASE_NAME: Joi.string().default('local'),
    });

    const { error, value } = schema.validate(process.env, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return {
      httpPort: parseInt(value.HTTP_PORT, 10),
      httpHost: value.HTTP_HOST,
      tcpPort: parseInt(value.TCP_PORT, 10),
      httpTimeout: parseInt(value.HTTP_TIMEOUT, 10),
      jwt: {
        secret: value.JWT_SECRET,
        expiresIn: value.JWT_EXPIRES_IN,
      },
      databases: {
        mongodb: {
          uri: value.MONGODB_URI,
          name: value.MONGODB_DATABASE_NAME,
        },
      },
    };
  }

  private loadPaymentConfig(): PaymentProps {
    const schema = Joi.object({
      SERVICE_NAME: Joi.string().required(),
      TCP_PORT: Joi.number().required(),
      STRIPE_API_KEY: Joi.string().required(),
      NOTIFICATIONS_PORT: Joi.number().required(),
      NOTIFICATIONS_HOST: Joi.string().required(),
    });

    const { error, value: envVars } = schema.validate(process.env, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return {
      tcpPort: envVars.TCP_PORT,
      stripeKey: envVars.STRIPE_API_KEY,
      notificationsPort: parseInt(envVars.NOTIFICATIONS_PORT, 10),
      notificationsHost: envVars.NOTIFICATIONS_HOST,
    };
  }

  private loadNotificationConfig(): NotificationProps {
    const schema = Joi.object({
      SERVICE_NAME: Joi.string().required(),
      TCP_PORT: Joi.number().required(),
    });

    const { error, value: envVars } = schema.validate(process.env, {
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return {
      tcpPort: envVars.TCP_PORT,
    };
  }

  get(key: string): any {
    const value = this.envConfig[key];

    if (value === undefined) {
      throw new Error(`Config error - ${key} is undefined`);
    }

    return this.envConfig[key];
  }
}
