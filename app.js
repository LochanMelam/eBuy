// required modules
const express = require("express");
const app = express();
const session = require("express-session");
const db = require("./configuration/dbConnection");

// view engine
app.set("view engine", "pug");
app.set("views", "./views");

// extracts form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// session middleware
app.use(
  session({ secret: "shhhhhh!", saveUninitialized: false, resave: false })
);
app.use(express.static("Product_images"));

const home = require("./routes/home");
const signup = require("./routes/signup");
const signin = require("./routes/signin");
const signout = require("./routes/signout");
const verification = require("./routes/verification");
const forgotPassword = require("./routes/forgotPassword");
const resetPassword = require("./routes/resetPassword");
const searchEngine = require("./routes/searchEngine");
const searchResults = require("./routes/searchResults");
const { response } = require("express");

app.use("/", home);
app.use("/signup", signup);
app.use("/signin", signin);
app.use("/signout", signout);
app.use("/verification", verification);
app.use("/forgotPassword", forgotPassword);
app.use("/resetPassword", resetPassword);
app.use("/api/allProducts", searchEngine);
app.use("/searchResults", searchResults);
app.get("*", (req, res) => {
  req.session.loggedIn ? res.redirect("/") : res.redirect("/signin");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("server running on port 3000......")
);
