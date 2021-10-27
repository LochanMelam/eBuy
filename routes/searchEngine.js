const express = require("express");
var router = express.Router();
const db = require("../configuration/dbConnection");
router.get("/:search", (req, res) => {
  var get_list =
    "SELECT * FROM Products WHERE name LIKE '" + req.params.search + "%" + "'";
  db.query(get_list, (err, response) => {
    let resultArray = Object.values(JSON.parse(JSON.stringify(response)));
    res.send(resultArray);
  });
});

module.exports = router;
