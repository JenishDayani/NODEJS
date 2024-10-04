const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo',
});

con.connect((error) => {
  if (error) {
    console.log('Error connecting to database', error);
  }
});

module.exports = con;
