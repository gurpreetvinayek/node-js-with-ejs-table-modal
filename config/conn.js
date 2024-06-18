const mysql = require('mysql');

const dbconn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'yajra'
});

dbconn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbconn;