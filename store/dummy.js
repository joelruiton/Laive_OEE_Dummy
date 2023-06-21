const db = {
    'ordenProduccion': [
        {ordenProduccion: 1, claseOrden: 'test', codMaterial: 1},
        {ordenProduccion: 2, claseOrden: 'test2', codMaterial: 2},
        {ordenProduccion: 3, claseOrden: 'test3', codMaterial: 3},
    ]
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let col =  await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function insert(tabla, data) {
    if(!db[tabla])
    {
        db[tabla] = [];
    }
    db[tabla].push(data);
    console.log(db);
}

async function update(tabla, data) {
    const index = db[tabla].findIndex(item => item.id === data.id);
    const item = db[tabla][index];
    db[tabla][index] = {
      ...item,
      ...data
    }
    console.log(db);
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    let col =  await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    insert,
    update,
    remove,
    query
}