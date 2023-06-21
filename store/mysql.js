const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    //Error al conectar
    connection.connect((err) => {
        if(err)
        {
            console.error('[db error]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected');
        }
    });

    //Error durante la conexion
    connection.on('error', (err) => {
        console.error('[db error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else{
            throw err;
        }
    });
}

handleCon();

async function list(tabla) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, 
        (err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

async function get(tabla, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE id = '${id}'`, 
        (err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

async function insert(tabla, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${tabla} SET ?`, data, 
        (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    })
}

async function update(tabla, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${tabla} SET ? WHERE id=?`, [data, data.id], 
        (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    })
}

async function remove(tabla, id) {
    return true;
}

async function query(table, query, join = null) {
    let joinQuery = '';
    if (join) {
        Object.entries(join).forEach(([key, value]) => {
            const [from, to] = value;
            joinQuery+= `JOIN ${key} ON ${table}.${from} = ${key}.${to}`;
        })
    }
    debug(`${table}, ${JSON.stringify(query)}, ${joinQuery}`);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query,  (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    });
}

module.exports = {
    list,
    get,
    insert,
    update,
    remove,
    query
}