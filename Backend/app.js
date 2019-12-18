var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
const path = require("path");
// var cookieParser = require('cookie-parser');
var logger = require("morgan");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
require("dotenv").config();

//=============================================================
/**
 * Endpoint routes
 */
var indexRouter = require("./routes/index");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var databaseRouter = require("./routes/database");
var scheduleRouter = require("./routes/schedule");
var logoutRouter = require("./routes/logout");
//=============================================================

//=============================================================
/**
 * Database connection
 */
const dbURI = process.env.ATLAS_URI;

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  function(err) {
    //Errors here
    if(err)
    {
      console.log(err);
    }
  }
);

var store = new MongoDBStore(
  {
    uri: dbURI,
    collection: "session"
  },
  function(err) {
    if(err)
    {
      console.log(err);
    }

  }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection suceeded");
});
//=============================================================

var app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000","http://34.73.234.214/"]
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// TODO: use a more secure secret
app.use(
  session({
    secret: "temporary secret",
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
    store: store,
    resave: false,
    saveUninitialized: true
  })
); //expires in a day
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/database", databaseRouter);
app.use("/schedule", scheduleRouter);
app.use("/logout", logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
