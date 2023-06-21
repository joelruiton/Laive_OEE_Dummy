const Joi = require('joi');

const ordenProduccion = Joi.number();
const claseOrden = Joi.string();
const codMaterial = Joi.number();
const fechaCreacion = Joi.date();
const fechaLiberacion = Joi.date();
const fechaPrimerConsumo = Joi.date();
const fechaCierre = Joi.date();
const estadoOrden = Joi.string();
const numPedido = Joi.number();

const createSchema = Joi.object({
    ordenProduccion: ordenProduccion.required(),
    claseOrden: claseOrden.required(),
    codMaterial: codMaterial.required(),
    numPedido: numPedido.required(),
});

const updateSchema = Joi.object({
    fechaLiberacion: fechaLiberacion,
    fechaCierre: fechaCierre,
    estadoOrden: estadoOrden
});

const getSchema = Joi.object({
    ordenProduccion: ordenProduccion.required(),
});

module.exports = {createSchema, updateSchema, getSchema};