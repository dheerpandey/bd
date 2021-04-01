const Joi = require('joi'); 
export const numberGeneratorSchema = Joi.object().keys({ 
    batchId: Joi.number().integer().min(1).required(),
    numbersPerBatch: Joi.number().integer().min(1).required(),
}); 