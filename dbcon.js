const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'ae6l65zdt4mk9tmg',
    password: 'eo20dq6pd2zhng24',
    database: 'wb28n4k083fa87aq',
    connectionLimit: 5
});

exports.pool = pool;
