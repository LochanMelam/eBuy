const express = require("express");
const router = express.Router();
var request = require("request");

router.get("/", (req, res) => {
  request(
    `http://${req.get("host")}/api/allProducts?search=${req.query.search}`,
    { json: true },
    (error, response, body) => {
      res.render("searchResults", { results: body });
    }
  );
});

module.exports = router;
