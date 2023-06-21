const config = require('../../config');
const store = require('../../store/' + config.database);
const auth = require('./auth.service');

const TABLA = 'usuario';

function service(inyectedStore) {
    let store = inyectedStore;
    if(!store){
        store = require('../../store/dummy');
    }

    async function list(){
        return store.list(TABLA);
    }
    
    async function get(id){
        return store.get(TABLA, id);
    }
    
    async function create(data){
        const user = {
            nombreCompleto: data.nombreCompleto,
            idDirectorioActivo: data.idDirectorioActivo,
          };

        if(data.password || data.username){
            await auth.insert({
                idDirectorioActivo: user.idDirectorioActivo,
                password: data.password,
            })
        }
        return store.insert(TABLA, data);
    }
    
    async function update(data){
        const user = {
            nombreCompleto: data.nombreCompleto,
            idDirectorioActivo: data.idDirectorioActivo,
          };

        if(data.password || data.username){
            await auth.update({
                idDirectorioActivo: user.idDirectorioActivo,
                password: data.password,
            })
        }
        return store.update(TABLA, data);
    }
    
    async function remove(id){
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        create,
        update,
        remove
    }
}

module.exports = service(store);