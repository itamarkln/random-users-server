import { ConfigService } from '@nestjs/config';
export interface EnvConfig {
    [key: string]: any;
}
export declare class EnvConfigService {
    private configService;
    constructor(configService: ConfigService);
    get NODE_ENV(): string;
    get APP_HOST(): string;
    get APP_PORT(): number;
    get MONGO_URI(): string;
}
