import { Injectable } from '@nestjs/common';
import { AuthProps, ConfigProps, ReservationProps } from './config.interface';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigProps;

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
      default:
        throw new Error(
          `Config error - ${serviceName} is not a valid service name`,
        );
    }
  }

  private loadReservationsConfig(): ReservationProps {
    const schema = Joi.object({
      SERVICE_NAME: Joi.string().required(),
      PORT: Joi.number().required(),
      HTTP_TIMEOUT: Joi.number().default(1000),
      API_URL: Joi.string().uri().required(),
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
      port: parseInt(envVars.PORT, 10),
      api: envVars.API_URL,
      httpTimeout: parseInt(envVars.HTTP_TIMEOUT, 10),
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
      PORT: Joi.number().required(),
      HTTP_TIMEOUT: Joi.number().default(1000),
      API_URL: Joi.string().uri().required(),
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
      port: parseInt(value.PORT, 10),
      api: value.API_URL,
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

  get(key: string): any {
    console.log(key);
    console.log(this.envConfig);
    const value = this.envConfig[key];
<<<<<<< Updated upstream

    console.log(value);
=======
    console.log('value', +value);
>>>>>>> Stashed changes

    if (value === undefined) {
      throw new Error(`Config error - ${key} is undefined`);
    }

    return this.envConfig[key];
  }
}
