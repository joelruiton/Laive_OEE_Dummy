const express = require('express');
const service = require('../services/produccion.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {createSchema, updateSchema, getSchema} = require('../schemas/produccion.schema');

const router = express.Router();

//Routes
router.get('/', list);
router.get('/:id', validatorHandler(getSchema, 'params'), get);
router.post('/', validatorHandler(createSchema, 'body'), create);
router.put('/:id', updatePut);
router.patch('/:id', validatorHandler(getSchema, 'params'), validatorHandler(updateSchema, 'body'), updatePatch);
router.delete('/:id', remove);

//Internal functions
async function list(req, res){
    const lista = await service.list();
    res.json(lista);
}

async function get(req, res, next){
    try {
      const { id } = req.params;
      const objeto = await service.get(id);
      if (objeto) {
        res.status(200).json(objeto);
      } else {
        res.status(404).json({
          message: 'Not found'
        });
      }
    } catch (e) {
      next(e);
    }
}

async function create(req,res) {
    const body = req.body;
    const objetoNuevo = await service.create(body);
    res.status(201).json({
      message: 'created',
      new: objetoNuevo
    })
}

async function updatePut(req,res) {
    const {id} = req.params;
    const body = req.body;
    res.json({
      message: 'updated',
      data: body,
      id
    })
}

async function updatePatch(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const objeto = await service.update(id, body);
      res.json({
        message: 'updated',
        object: objeto
      })
    } catch (e) {
      next(e);
    }
}

async function remove(req,res) {
    const {id} = req.params;
    const rpta = await service.remove(id);
    res.json({
      message: 'deleted',
      rpta
    })
}

module.exports = router;