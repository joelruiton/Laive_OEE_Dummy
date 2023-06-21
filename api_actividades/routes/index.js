const express = require('express');

const authRouter = require('./auth.router');
const usuarioRouter = require('./usuario.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/usuario', usuarioRouter);
}

module.exports = routerApi;