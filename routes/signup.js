const express = require("express")
var mysql = require('mysql2');
const router = express.Router();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
con.connect((err) => {
if(err){
    console.log('Error connecting to Db!',err);
    return;
}
console.log('Connection established');
});

router.get("/", (req,res) => {
    res.render("signup")
})

router.post("/", (req, res) => {
    var name = req.body.username;
    var mail = req.body.email;
    var password = req.body.password;
    var sql = "INSERT INTO Users (username, email, password) VALUES ('" + name + "', '" + mail + "', '" + password + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    
    res.render("home");
});

module.exports = router;