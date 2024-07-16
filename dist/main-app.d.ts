import { Type } from '@nestjs/common';
export declare class MainApp {
    private _nestApp;
    get<T>(type: string | symbol | Type<T>): T;
    init(): Promise<void>;
    private useMiddlewares;
    listen(): Promise<void>;
}
