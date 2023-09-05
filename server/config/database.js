const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: '*****',
    database: 'bdsages',
  });

  module.exports = connection;
