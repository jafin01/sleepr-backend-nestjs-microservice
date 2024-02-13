export interface MongodbConfigProps {
  uri: string;
  name: string;
}

export interface DatabaseProps {
  mongodb?: MongodbConfigProps;
}

export interface AuthProps {
  httpPort: number;
  tcpPort: number;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  databases: DatabaseProps;
}

export interface ReservationProps {
  httpPort: number;
  authPort: number;
  authHost: string;
  paymentsPort: number;
  paymentsHost: string;
  databases: DatabaseProps;
}

export interface PaymentProps {
  tcpPort: number;
  stripeKey: string;
  notificationsPort: number;
  notificationsHost: string;
}

export interface NotificationProps {
  tcpPort: number;
  smtpUser: string;
  smtpClientId: string;
  smtpClientSecret: string;
  smtpRefreshToken: string;
}

export interface ConfigProps {
  databases?: DatabaseProps;
  reservations?: ReservationProps;
  auth?: AuthProps;
  payments?: PaymentProps;
  notifications?: NotificationProps;
}
