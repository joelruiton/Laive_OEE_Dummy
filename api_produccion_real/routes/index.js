const express = require('express');

const ordenProduccionRouter = require('./ordenProduccion.router');
const materialRouter = require('./material.router');
const turnoCabeceraRouter = require('./turnoCabecera.router');
const turnoDetalleRouter = require('./turnoDetalle.router');
const maquinaOperarioRouter = require('./maquinaOperario.router');
const velocidadRouter = require('./velocidad.router');
const produccionRouter = require('./produccion.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/ordenProduccion', ordenProduccionRouter);
  router.use('/material', materialRouter);
  router.use('/turnoCabecera', turnoCabeceraRouter);
  router.use('/turnoDetalle', turnoDetalleRouter);
  router.use('/maquinaOperario', maquinaOperarioRouter);
  router.use('/velocidad', velocidadRouter);
  router.use('/produccion', produccionRouter);
}

module.exports = routerApi;