const boom = require('@hapi/boom');

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];  //property puede ser body, params o query, es dinamico
    const {error} = schema.validate(data, { abortEarly: false}); //abortEarly: falsepara devolver todos los errores y no 1x1
    if(error){
      next(boom.badRequest(error));
    }else{
      next();
    }
  }
}

module.exports = validatorHandler;