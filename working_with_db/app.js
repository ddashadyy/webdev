var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var student = require("./routes/student");
var teacher = require("./routes/teacher");
var discipline = require("./routes/discipline");
var studentGroup = require('./routes/studentGroup');
var schedule = require('./routes/schedule');
var journal = require('./routes/journal');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", student);
app.use("/", teacher);
app.use("/", discipline);
app.use('/', studentGroup);
app.use('/', schedule);
app.use('/', journal);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(3000);

app.get("/", function (req, res) {
  res.render("index");
});
