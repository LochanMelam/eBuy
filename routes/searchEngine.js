const express = require("express");
var router = express.Router();
const db = require("../configuration/dbConnection");
router.get("/", (req, res) => {
  var get_list = req.query.search
    ? "SELECT * FROM Products WHERE name LIKE '" + req.query.search + "%" + "'"
    : "SELECT * FROM Products WHERE category = '" + req.query.category + "'";
  if (req.query.home) {
    get_list = "SELECT * FROM Products";
  }
  db.query(get_list, (err, response) => {
    let resultArray = Object.values(JSON.parse(JSON.stringify(response)));
    res.send(resultArray);
  });
});

module.exports = router;
