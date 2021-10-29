const express = require("express");
const router = express.Router();

function loginCheck(req, res, next) {
  req.session.loggedIn ? next() : res.redirect("/signin");
}

router.get("/", loginCheck, (req, res) => {
  res.render("home", { user: req.session.user });
});

module.exports = router;
