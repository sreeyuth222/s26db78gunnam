var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

// GET register page
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register', message: req.query.message, user: req.user });
});

// POST register user
router.post('/register', async function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).render('register', {
      title: 'Register',
      message: 'Username and password are required.',
      user: req.user
    });
  }

  try {
    await Account.register(new Account({ username: req.body.username }), req.body.password);
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  } catch (err) {
    const errorText = (err && (err.message || err.name)) ? (err.message || err.name) : '';
    const isDuplicateUser = err.name === 'UserExistsError' || /already\s+(registered|exists)|duplicate/i.test(errorText);

    let message = 'Registration failed. Please try again.';
    if (isDuplicateUser) {
      message = 'That username is already registered. Please choose another one.';
    } else if (errorText) {
      message = 'Registration error: ' + errorText;
    }

    return res.status(400).render('register', {
      title: 'Register',
      message: message,
      user: req.user
    });
  }
});

// GET login page
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', message: req.query.message, user: req.user });
});

// POST login user
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login?message=Invalid%20username%20or%20password.'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// GET logout user
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// GET ping route for health checks
router.get('/ping', function(req, res) {
  res.status(200).send('pong');
});

module.exports = router;
