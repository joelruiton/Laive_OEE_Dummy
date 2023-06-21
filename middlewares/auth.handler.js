const jwt = require('jsonwebtoken');
const config = require('../config');
const boom = require('@hapi/boom');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if(decoded.id !== owner){
            throw boom.unauthorized('No permitido');
        }
    },
    logged: function (req) {
        const decoded = decodeHeader(req);
    }
}

function verify(token) {
    return jwt.verify(token, secret);
}

function getToken(auth) {
    if(!auth){
        throw boom.badRequest('No viene Token');
    }

    if(auth.indexOf('Bearer ') === -1){
        throw boom.badRequest('Formato inválido');
    }

    let token = auth.replace('Bearer ','');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}