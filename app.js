const express = require("express");
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

const home = require("./routes/home");
app.use("/", home);

app.listen(process.env.PORT || 3000, () =>
  console.log("server running on port 3000......")
);
