import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  api: {
    apiUrl: process.env.API_URL || 'http://localhost:8080',
    httpTimeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 1000,
  },
  mongodb: {
    database: {
      connectionString: process.env.MONGODB_URI || 'mongodb://localhost:27017',
      databaseName: process.env.MONGODB_DATABASE_NAME || 'local',
    },
  },
});
