const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


con.connect((err) => {
  if(err){
    console.log('Error connecting to Db!');
    return;
  }
  console.log('Connection established');
});


app.set("view engine", "pug");
app.set("views", "./views");

const home = require("./routes/home");
const signup = require("./routes/signup")
app.use("/", home);
app.use("/signup",signup)


app.get("*",(req,res) => {
  res.send("Sorry this is an invalid url.");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("server running on port 3000......")
);
