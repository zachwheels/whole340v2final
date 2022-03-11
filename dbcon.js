const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_wheelihz',
    password: '1014',
    database: 'cs340_wheelihz',
    connectionLimit: 5
});

exports.pool = pool;
