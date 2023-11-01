const Pool = require('pg').Pool;

const db = new Pool({
    user: 'postgres',
    password: '1234567q',
    host: 'localhost',
    port: 5432,
    database: 'snake_database',
});

module.exports = db;
