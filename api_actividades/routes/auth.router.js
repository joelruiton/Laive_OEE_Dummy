const express = require('express');
const service = require('../services/auth.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {loginSchema} = require('../schemas/auth.schema');

const router = express.Router();

//Routes
router.post('/login', validatorHandler(loginSchema, 'body'), login);

//Internal functions
async function login(req, res, next){
    try {
      const token = await service.login(req.body.username, req.body.password);
      res.status(200).json({
        message: 'Logged',
        token
      })
    } catch (e) {
      next(e);
    }
}

module.exports = router;