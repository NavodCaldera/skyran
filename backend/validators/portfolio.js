const Joi = require('joi');

const riskCalShema = Joi.object({
    age : Joi.number().required(),
    income: Joi.number().required(),
    expenses: Joi.number().required(),
    dependents : Joi.number().required()
})

module.exports = {riskCalShema}