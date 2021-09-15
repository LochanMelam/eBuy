const mysql = require("mysql");
require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect((err) => {
  if (err) console.log("Error connecting to Db!", err);
  else console.log("Connected to db...");
});

module.exports = con;
