module.exports = {
    database: "dummy",
    api:{
        port: process.env.API_PORT || 3000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql10509874',
        password: process.env.MYSQL_PASS || 'qQXmCIfk9c',
        database: process.env.MYSQL_DB || 'sql10509874',
    },
    mysqlService:{
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}