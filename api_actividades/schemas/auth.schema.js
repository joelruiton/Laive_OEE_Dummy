const Joi = require('joi');

const idDirectorioActivo = Joi.string();
const password = Joi.string();

const loginSchema = Joi.object({
    idDirectorioActivo: idDirectorioActivo.required(),
    password: password.required()
});

module.exports = {loginSchema};