const Joi = require('joi'); 
export const multiplierRequestSchema = Joi.object().keys({ 
    batchId: Joi.number().integer().min(1).required(),
    number: Joi.number().integer().min(1).required(),
}); 