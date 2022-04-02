const mysql  = require('mysql2');

const con = mysql.createPool({
    host: 'localhost',
    database: 'modori',
    user: 'root',
    password: '1234',
    connectionLimit: 30
});

module.exports = con;
