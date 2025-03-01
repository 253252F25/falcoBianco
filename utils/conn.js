var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST, // Usa le variabili d'ambiente per la connessione
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
