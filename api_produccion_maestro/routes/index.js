const express = require('express');

const grupoParadaRouter = require('./producto.router');
const indicadorRouter = require('./turnoCabecera.router');
const maquinaRouter = require('./calendario.router');
const paradaRouter = require('./parada.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/grupoParada', grupoParadaRouter);
  router.use('/indicador', indicadorRouter);
  router.use('/maquina', maquinaRouter);
  router.use('/parada', paradaRouter);
}

module.exports = routerApi;