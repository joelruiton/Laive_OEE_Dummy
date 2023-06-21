const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const routerApi = require('./routes')

const config = require('../config');

const {logErrors, errorHandler, boomErrorHandler} = require('../middlewares/error.handler')

const app = express();

app.use(express.json());

// const whiteList = ['http://localhost:8080','https://myapp.com']; //dominios permitidos
// const options = {
//   origin: (origin, callback) => {
//     if(whiteList.includes(origin) || !origin)  // || !origin para aceptar nuestro propio origen
//     {
//       callback(null,true);
//     }else{
//       callback(new Error('No permitido'))
//     }
//   }
// }
app.use(cors());  //habilita cualquier dominio a nuestra api
//app.use(cors(options));  //acepta solo dominios permitios segun reglas de options

routerApi(app);
//Docs
const swaggerDoc = require('./swagger.json'); //generado en la web https://editor.swagger.io/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.api.port, ()=> {
    console.log('API Producción Real escuchando en el puerto', config.api.port);
})