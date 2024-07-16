import * as Joi from 'joi';

export const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision'),
  APP_HOST: Joi.string(),
  APP_PORT: Joi.number(),
  MONGO_URI: Joi.string()
});
