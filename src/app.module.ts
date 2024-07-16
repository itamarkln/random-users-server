import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { EnvConfigService } from './common/config/config.service';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (envConfigService: EnvConfigService) => ({
        uri: envConfigService.MONGO_URI,
      }),
      inject: [EnvConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
