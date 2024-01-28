// config.service.ts

import { Injectable } from '@nestjs/common';
import { config as appConfig } from './config';
import { ConfigProps } from './config.interface';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigProps;

  constructor() {
    this.envConfig = appConfig();
  }

  get(key: string): any {
    const value = this.envConfig[key];

    console.log(value);

    if (value === undefined) {
      throw new Error(`Config error - ${key} is undefined`);
    }

    return this.envConfig[key];
  }
}
