const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) =>  {
      if (err) { return done(err); }
      bcrypt.compare(password, user.password, (err, success) => {
        if (err) { return done(err); }
        if (!success) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    });
  })
);

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, (jwtPayload, done) => {
  User.findOne({ username: jwtPayload.username }, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

exports.createUser = function(req, res, next) {
  const { username, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      User.create({ username, password: hash }, (err, user) => {
        if (err) { return next(err); }
      });
    });
  });
};

exports.deleteUser = function(req, res, next) {
  User.deleteOne({ username: req.body.username }, {}, (err) => {
    if (err) { return next(err); }
  });
};

exports.signIn = function(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Authentication was unsuccessful.' });
    };

    req.login(user, { session: false }, err => {
      if (err) { res.send(err); }
    });

    const { username } = user;
    const token = jwt.sign({ username }, process.env.SECRET);
    return res.json({ username, token });
  })(req, res, next);
};