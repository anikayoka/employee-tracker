const mysql = require("mysql2");
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  // port: 3301,
  // Your MySQL username,
  user: process.env.user,
  // Your MySQL password
  password: process.env.password,
  database: 'employees'
});

module.exports = db;