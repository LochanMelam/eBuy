const express = require("express");
const router = express.Router();
const db = require("../configuration/dbConnection");

router.get("/:id", (req, res) => {
  var userExists = "SELECT id FROM Users WHERE id = '" + req.params.id + "'";
  db.query(userExists, (error, response) => {
    if (error) console.log("error");
    if (response.length != 0) {
      res.render("resetPassword");
    } else {
      res.redirect("/signin");
    }
  });
});

router.post("/:id", (req, res) => {
  var updatePassword =
    "UPDATE Users SET password = '" +
    req.body.password +
    "' WHERE id = '" +
    req.params.id +
    "'";
  db.query(updatePassword, (error, response) => {
    if (error) console.log(error);
    res.render("resetPassword", { prompt: "password reset successfull" });
  });
});

module.exports = router;
