export interface ApiConfigProps {
  apiUrl: string;
  httpTimeout: number;
}

export interface MongodbConfigProps {
  connectionString: string;
  databaseName: string;
}

export interface ConfigProps {
  port: number;
  api: ApiConfigProps;
  mongodb: {
    database: MongodbConfigProps;
  };
}
