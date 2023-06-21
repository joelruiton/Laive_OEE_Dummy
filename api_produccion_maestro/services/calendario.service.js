const config = require('../../config');
const store = require('../../store/' + config.database);
const TABLA = 'maquina';

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
        return store.insert(TABLA, data);
    }
    
    async function update(id, data){
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