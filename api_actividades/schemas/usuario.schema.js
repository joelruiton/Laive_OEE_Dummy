const Joi = require('joi');

const tipoDocumento = Joi.string();
const nroDocumento = Joi.string();
const idDirectorioActivo = Joi.string();
const nombreCompleto = Joi.string();
const posicion = Joi.string();
const operacion = Joi.string();
const maquina = Joi.string();
const estado = Joi.boolean();
const password = Joi.string();

const createSchema = Joi.object({
    tipoDocumento: tipoDocumento.required(),
    nroDocumento: nroDocumento.required(),
    idDirectorioActivo: idDirectorioActivo.required(),
    nombreCompleto: nombreCompleto.required(),
    posicion: posicion.required(),
    operacion: operacion.required(),
    maquina: maquina.required(),
    password: password
});

const updateSchema = Joi.object({
    tipoDocumento: tipoDocumento,
    nroDocumento: nroDocumento,
    idDirectorioActivo: idDirectorioActivo
});

const getSchema = Joi.object({
    idDirectorioActivo: idDirectorioActivo.required(),
});

module.exports = {createSchema, updateSchema, getSchema};