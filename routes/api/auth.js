const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const auth = require('../../middelware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

//route    Get api/auth
//@desc    Test route
//@access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//route    Post api/auth
//@desc    Authentificate User & Get token
//@access  Public

router.post('/', (req, res, next) => {
  // call for passport authentication
  passport.authenticate('local', (err, user, info) => {
    // error from passport middleware
    if (err) {
      return res.status(400).json(err);
    }
    // registered user
    else if (user) {
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
    // unknown user or wrong password
    else {
      return res.status(404).json(info);
    }
  })(req, res);
});

module.exports = router;
