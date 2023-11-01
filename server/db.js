const Pool = require('pg').Pool;

// Треба змінити данні

/* 
database snake_database
Table leader_board

id SERIAL Primary Key
player_name VARCHAR(255)
player_score Integer

*/

const db = new Pool({
    user: 'postgres',
    password: '1234567q',
    host: 'localhost',
    port: 5432,
    database: 'snake_database',
});

module.exports = db;
