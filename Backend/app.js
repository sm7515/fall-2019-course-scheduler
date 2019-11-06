var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();


//=============================================================
/**
 * Endpoint routes
 */
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require("./routes/login");
var databaseRouter = require('./routes/database');
//=============================================================

//=============================================================
/**
 * Database connection
 */
const dbURI = process.env.ATLAS_URI


mongoose.connect(dbURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, function(error){
  //Errors here
  // console.log(error);
});

mongoose.connection.once('open', ()=>{

  console.log("MongoDB database connection suceeded");
});
//=============================================================

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/database', databaseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
