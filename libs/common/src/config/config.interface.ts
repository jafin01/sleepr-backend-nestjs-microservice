<<<<<<< Updated upstream
export interface ApiConfigProps {
  apiUrl: string;
  httpTimeout: number;
}

=======
>>>>>>> Stashed changes
export interface MongodbConfigProps {
  uri: string;
  name: string;
}

<<<<<<< Updated upstream
export interface ConfigProps {
  port: number;
  api: ApiConfigProps;
  mongodb: {
    database: MongodbConfigProps;
  };
=======
export interface DatabaseProps {
  mongodb?: MongodbConfigProps;
}

export interface CommonDatabaseProps {
  databases: DatabaseProps;
}

export interface ReservationProps {
  port: number;
  api: string;
  httpTimeout: number;
  databases: DatabaseProps;
}
export interface AuthProps {
  port: number;
  api: string;
  httpTimeout: number;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  databases: DatabaseProps;
}

export interface ConfigProps {
  databases?: DatabaseProps;
  reservations?: ReservationProps;
  auth?: AuthProps;
>>>>>>> Stashed changes
}
