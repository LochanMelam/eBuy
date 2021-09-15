const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

const home = require("./routes/home");
const signup = require("./routes/signup");
const verification = require("./routes/verification");

app.use("/", home);
app.use("/signup", signup);
app.use("/verification", verification);

app.get("*", (req, res) => {
  res.send("Sorry this is an invalid url.");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("server running on port 3000......")
);
