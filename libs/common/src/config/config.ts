import { ConfigProps } from './config.interface';
import * as Joi from 'joi';

const schema = Joi.object({
  RESERVATION_PORT: Joi.number().required(),
  AUTH_PORT: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
  RESERVATION_API_URL: Joi.string().uri().required(),
  AUTH_API_URL: Joi.string().uri().required(),
  HTTP_TIMEOUT: Joi.number().default(1000),
  MONGODB_DATABASE_NAME: Joi.string().default('local'),
});

export const config = (): ConfigProps => {
  const { error, value: envVars } = schema.validate(process.env, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    port: {
      reservation: parseInt(envVars.RESERVATION_PORT, 10),
      auth: parseInt(envVars.AUTH_PORT, 10),
    },
    api: {
      reservation: envVars.RESERVATION_API_URL,
      auth: envVars.AUTH_API_URL,
      httpTimeout: parseInt(envVars.HTTP_TIMEOUT, 10),
    },
    mongodb: {
      database: {
        connectionString: envVars.MONGODB_URI,
        databaseName: envVars.MONGODB_DATABASE_NAME,
      },
    },
  };
};
