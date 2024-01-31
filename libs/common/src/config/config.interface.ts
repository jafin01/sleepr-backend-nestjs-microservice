export interface ApiConfigProps {
  reservation: string;
  auth: string;
  httpTimeout: number;
}

export interface MongodbConfigProps {
  connectionString: string;
  databaseName: string;
}

export interface PortConfigProps {
  reservation: number;
  auth: number;
}

export interface ConfigProps {
  port: PortConfigProps;
  api: ApiConfigProps;
  mongodb: {
    database: MongodbConfigProps;
  };
}
