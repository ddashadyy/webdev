var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var pp = require('./passport');
var student = require("./routes/student");
var teacher = require("./routes/teacher");
var discipline = require("./routes/discipline");
var studentGroup = require("./routes/studentGroup");
var schedule = require("./routes/schedule");
var journal = require("./routes/journal");
var authentication = require("./routes/authentication");


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(expressSession({secret: "key"}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.username = req.user ? req.user.username : "";
  next();
});

app.use("/", authentication);
app.use("/", student);
app.use("/", teacher);
app.use("/", discipline);
app.use("/", studentGroup);
app.use("/", schedule);
app.use("/", journal);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", function (req, res) {
  res.render("index");
});
