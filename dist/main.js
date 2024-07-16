"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_app_1 = require("./main-app");
async function bootstrap() {
    const app = new main_app_1.MainApp();
    await app.init();
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map