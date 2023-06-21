const config = require('../../config');
const store = require('../../store/' + config.database);
const bcrypt = require ('bcrypt');
const auth = require('../../middlewares/auth.handler');
const boom = require('@hapi/boom');

const TABLA = 'auth';

function service(inyectedStore) {
    let store = inyectedStore;
    if(!store){
        store = require('../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, {username: username});

        if (await bcrypt.compare(password, data.password))
            //return auth.sign(data);
            return auth.sign(JSON.parse(JSON.stringify(data)));
        else
            throw new Error('Informacion Invalida');
    }
    
    async function insert(data){
        const authData = {
            idDirectorioActivo: data.idDirectorioActivo
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return store.insert(TABLA, authData);
    }
    
    async function update(data){
        const authData = {
            idDirectorioActivo: data.idDirectorioActivo
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return store.update(TABLA, authData);
    }

    return {
        login,
        insert,
        update
    }
}

module.exports = service(store);