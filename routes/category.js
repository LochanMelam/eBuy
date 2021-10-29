const express = require("express");
const router = express.Router();
var request = require("request");

router.get("/", (req, res) => {
  request(
    `http://${req.get("host")}/api/allProducts?category=${req.query.category}`,
    { json: true },
    (error, response, body) => {
      res.render("category", { results: body });
    }
  );
});
module.exports = router;
