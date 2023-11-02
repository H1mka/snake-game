require('dotenv').config();
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
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
});

module.exports = db;
