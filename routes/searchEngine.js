const express = require("express");
var router = express.Router();
const db = require("../configuration/dbConnection");
router.get("/", (req, res) => {
  var get_list =
    "SELECT * FROM Products WHERE name LIKE '" + req.query.search + "%" + "'";
  if (req.query.category) {
    get_list =
      "SELECT * FROM Products WHERE category = '" + req.query.category + "'";
  }
  db.query(get_list, (err, response) => {
    let resultArray = Object.values(JSON.parse(JSON.stringify(response)));
    res.send(resultArray);
  });
});

module.exports = router;
