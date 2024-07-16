"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentValidationSchema = void 0;
const Joi = require("joi");
exports.environmentValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision'),
    APP_HOST: Joi.string(),
    APP_PORT: Joi.number(),
    MONGO_URI: Joi.string()
});
//# sourceMappingURL=validation-config.schema.js.map