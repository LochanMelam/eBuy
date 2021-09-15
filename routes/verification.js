const express = require("express");
var router = express.Router();
const db = require("../configuration/dbConnection");

//get route
router.get("/:id", (req, res) => {
  var check_id =
    "UPDATE Users SET is_verified = '1' WHERE id = '" + req.params.id + "'";
  db.query(check_id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Verified");
      res.send("Email Verification Successful");
    }
  });
});

module.exports = router;
