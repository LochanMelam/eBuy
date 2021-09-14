const express = require("express");
const router = express.Router();
const db = require("../configuration/dbConnection");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", (req, res) => {
  var name = req.body.username;
  var mail = req.body.email;
  var password = req.body.password;
  var row =
    "INSERT INTO Users (username, email, password) VALUES ('" +
    name +
    "', '" +
    mail +
    "', '" +
    password +
    "')";
  db.query(row, (err, result) => {
    if (err) throw err;
    console.log("inserted a new row");
  });

  res.render("home");
});

module.exports = router;
