import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EnvConfig {
  [key: string]: any;
}

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) { }

  //#region getters
  public get NODE_ENV(): string {
    return this.configService.get<string>('environment');
  }

  public get APP_HOST(): string {
    return this.configService.get<string>('http.host');
  }

  public get APP_PORT(): number {
    return this.configService.get<number>('http.port');
  }

  public get MONGO_URI(): string {
    return this.configService.get<string>('db.mongodb.uri');
  }
  //#endregion
}
