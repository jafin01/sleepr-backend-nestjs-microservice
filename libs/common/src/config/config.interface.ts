export interface MongodbConfigProps {
  uri: string;
  name: string;
}

export interface DatabaseProps {
  mongodb?: MongodbConfigProps;
}

export interface ReservationProps {
  httpPort: number;
  httpHost: string;
  authPort: number;
  authHost: string;
  paymentsPort: number;
  paymentsHost: string;
  httpTimeout: number;
  databases: DatabaseProps;
}

export interface PaymentProps {
  tcpPort: number;
  stripeKey: string;
}

export interface AuthProps {
  httpPort: number;
  tcpPort: number;
  httpHost: string;
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
  payments?: PaymentProps;
}
