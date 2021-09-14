const express = require("express");
const router = express.Router();
const db = require("../configuration/dbConnection");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", (req, res) => {
  var id = uuidv4();
  var name = req.body.username;
  var mail = req.body.email;
  var password = req.body.password;
  var row =
    "INSERT INTO Users (id,username, email, password) VALUES ('" +
    id +
    "', '" +
    name +
    "', '" +
    mail +
    "', '" +
    password +
    "')";
  db.query(row, (err, result) => {
    if (err) throw error;
    if (err) {
      res.redirect("/signup");
    } else {
      console.log("inserted a new row");
      res.redirect("/");
    }
  });
});

module.exports = router;
