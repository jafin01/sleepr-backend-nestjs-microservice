export interface ApiConfigProps {
  reservation: string;
  auth: string;
  httpTimeout: number;
}

export interface MongodbConfigProps {
  uri: string;
  name: string;
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

export interface PortConfigProps {
  reservation: number;
  auth: number;
}

export interface ConfigProps {
  databases?: DatabaseProps;
  reservations?: ReservationProps;
  auth?: AuthProps;
}
