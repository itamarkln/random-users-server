import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/config';
import { EnvConfigService } from './config/config.service';
import { environmentValidationSchema } from './config/schema/validation-config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: environmentValidationSchema,
    })
  ],
  controllers: [],
  providers: [ConfigService, EnvConfigService],
  exports: [ConfigService, EnvConfigService],
})
export class CommonModule { }
