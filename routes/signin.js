const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../configuration/dbConnection");

router.get("/", (req, res) => {
  req.session.loggedIn ? res.redirect("/") : res.render("signin");
});

router.post("/", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //error callback
  function errorCallback(msg) {
    res.render("signin", {
      prompt: msg,
    });
  }

  //successfull callback
  function callback() {
    res.redirect("/");
  }

  // sends a verification mail to the user
  function sendVerificationMail(id) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "ecashier2021@gmail.com",
      to: `${email}`,
      subject: "Account Verification for gadgetsHub",
      text: `Click on the link  to verify your email http://${req.get(
        "host"
      )}/verification/${id}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("send mail error", error);
        errorCallback(
          "can't send verification email please enter a valid email"
        );
      } else {
        res.render("verification");
      }
    });
  }

  var userExists = "SELECT * FROM Users WHERE email = '" + email + "'";
  db.query(userExists, (err, response) => {
    if (err) throw err;
    try {
      if (response.length == 0) {
        res.redirect("/signup");
      } else {
        if (response[0].is_verified == 0) {
          sendVerificationMail(response[0].id);
        } else if (response[0].password == password) {
          req.session.cookie.maxAge = 24 * 3600000;
          req.session.loggedIn = true;
          callback();
        } else {
          errorCallback("Invalid Password");
        }
      }
    } catch (err) {
      console.log(err);
      errorCallback("Something went wrong.... Please try again");
    }
  });
});

module.exports = router;
