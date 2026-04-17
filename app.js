var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');

require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_CON;
var Costume = require("./models/costume");
var Account = require("./models/account");

let reseed = true;

mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async function () {
  console.log('Connection to DB succeeded');
  if (reseed) {
    await recreateDB();
  }
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var gridRouter = require('./routes/grid');
var selectorRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var costumeRouter = require('./routes/costume');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'costumeappsecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/grid', gridRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);
app.use('/costumes', costumeRouter);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

async function recreateDB() {
  await Costume.deleteMany();

  let instance1 = new Costume({
    costume_type: "ghost",
    size: "large",
    cost: 15.4
  });

  let instance2 = new Costume({
    costume_type: "witch",
    size: "medium",
    cost: 20.0
  });

  let instance3 = new Costume({
    costume_type: "pirate",
    size: "small",
    cost: 18.5
  });

  await instance1.save();
  await instance2.save();
  await instance3.save();

  console.log("Sample data seeded");
}

