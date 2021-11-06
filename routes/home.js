const express = require("express");
const router = express.Router();
const request = require("request");
function loginCheck(req, res, next) {
  req.session.loggedIn ? next() : res.redirect("/signin");
}

router.get("/", loginCheck, (req, res) => {
  request(
    `http://${req.get("host")}/api/allProducts?home=${true}`,
    { json: true },
    (error, response, body) => {
      var result = [[], [], [], []];
      for (var i = 0; i < body.length; i++) {
        if (body[i].category == "M") result[0].push(body[i]);
        else if (body[i].category == "L") result[1].push(body[i]);
        else if (body[i].category == "H") result[2].push(body[i]);
        else result[3].push(body[i]);
      }
      res.render("home", { user: req.session.user, result: result });
    }
  );
});

module.exports = router;
