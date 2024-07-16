"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApp = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("./common/config/config.service");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
class MainApp {
    get(type) {
        return this._nestApp.get(type);
    }
    async init() {
        this._nestApp = await core_1.NestFactory.create(app_module_1.AppModule);
        await this.useMiddlewares();
    }
    async useMiddlewares() {
        this._nestApp.enableCors({
            origin: ['http://localhost:3000'],
            methods: '*',
            credentials: false,
        });
        this._nestApp.useGlobalPipes(new common_1.ValidationPipe());
        this._nestApp.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    }
    async listen() {
        const envConfigService = this._nestApp.get(config_service_1.EnvConfigService);
        this._nestApp.listen(envConfigService.APP_PORT, envConfigService.APP_HOST);
    }
}
exports.MainApp = MainApp;
//# sourceMappingURL=main-app.js.map