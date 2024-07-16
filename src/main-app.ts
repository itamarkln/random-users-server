import { INestApplication, Type, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './common/config/config.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

export class MainApp {
  private _nestApp: INestApplication;

  public get<T>(type: string | symbol | Type<T>): T {
    return this._nestApp.get(type);
  }

  public async init(): Promise<void> {
    this._nestApp = await NestFactory.create(AppModule);

    await this.useMiddlewares();
  }

  private async useMiddlewares(): Promise<void> {
    this._nestApp.enableCors(
      {
        origin: ['http://localhost:3000'],
        methods: '*',
        credentials: false,
      }
    );
    this._nestApp.useGlobalPipes(new ValidationPipe());
    this._nestApp.useGlobalFilters(new HttpExceptionFilter());
  }

  public async listen(): Promise<void> {
    const envConfigService = this._nestApp.get(EnvConfigService);
    this._nestApp.listen(envConfigService.APP_PORT, envConfigService.APP_HOST);
  }
}
