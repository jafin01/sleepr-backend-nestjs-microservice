import { ConfigProps } from './config.interface';
import * as Joi from 'joi';

const schema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
  API_URL: Joi.string().uri().required(),
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
    port: parseInt(envVars.PORT, 10),
    api: {
      apiUrl: envVars.API_URL,
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
