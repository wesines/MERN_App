const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/Users');

passport.use(
  new localStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      // unknown user
      else if (!user) {
        return done(null, false, { message: 'Email non enregistré' });
      } // wrong password
      else if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Mot de passe erroné.' });
      }
      // authentication succeeded
      else return done(null, user);
    });
  })
);
