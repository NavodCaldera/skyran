const Joi = require('joi');

const registerSchema = Joi.object({
    first_name: Joi.string().trim().min(1).max(30).required(),
    last_name: Joi.string().trim().min(1).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthday: Joi.date().max('now').required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
