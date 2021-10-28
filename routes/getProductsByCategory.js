const express = require("express");
var router = express.Router();
const db = require("../configuration/dbConnection");
router.get("/:ctg", (req, res) => {
  var get_list =
  "SELECT * FROM Products WHERE category = '" + req.params.ctg + "'";;
  db.query(get_list, (err, response) => {
    let resultArray = Object.values(JSON.parse(JSON.stringify(response)));
    res.send(resultArray);
  });
});

module.exports = router;
