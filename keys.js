module.exports = {

    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'paterdev',
        password: process.env.DATABASE_PASSWORD || 'paterp4',
        database: process.env.DATABASE_NAME || 'paternoster'
    }

};