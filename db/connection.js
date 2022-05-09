const mysql = require("mysql2");
require('dotenv').config();
console.log(process.env.password)
// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: process.env.user,
  // Your MySQL password
  password: process.env.password,
  database: 'employee'
});

module.exports = db;