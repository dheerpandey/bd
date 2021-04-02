const Joi = require('joi');
export const batchRequestSchema = Joi.object().keys({
    batchSize: Joi.number().integer().min(1).max(250).required(),
    numbersPerBatch: Joi.number().integer().min(1).max(250).required(),
});