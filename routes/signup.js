const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../configuration/dbConnection");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  req.session.loggedIn ? res.redirect("/") : res.render("signup");
});

router.post("/", (req, res) => {
  var id = uuidv4();
  var name = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  //error callback
  function errorCallback(msg) {
    res.render("signup", {
      prompt: msg,
    });
  }

  //successfull callback
  function callback() {
    var row =
      "INSERT INTO Users (id,username, email, password) VALUES ('" +
      id +
      "', '" +
      name +
      "', '" +
      email +
      "', '" +
      password +
      "')";
    db.query(row, (err, result) => {
      if (err) {
        console.log(err);
        errorCallback("error adding User to the db please try again....");
      } else {
        sendVerificationMail(id);
      }
    });
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
  // checks if user with the email already exists
  var emailExists = "SELECT id FROM Users WHERE email = '" + email + "'";
  db.query(emailExists, (err, response) => {
    if (err) console.log(err);
    try {
      // if user with email doesn't exists, creates a new user account and sends verification mail
      if (response.length == 0) {
        {
          callback();
        }
      }
      // if email already used then prompts the client, "email in use"
      else {
        errorCallback("email already in use");
      }
    } catch (error) {
      console.log(error);
      errorCallback("email already in use");
    }
  });
});

module.exports = router;
