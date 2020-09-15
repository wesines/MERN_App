const express = require('express');
const app = express();

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const bodyParser = require('body-parser');

const auth = require('../../middelware/auth');
var ObjectId = require('mongoose').Types.ObjectId;

const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const { JsonWebTokenError } = require('jsonwebtoken');
const { json } = require('express');

//route    Post api/users
//@desc    Test user
//@access  Public
//router.post('/', (req, res) => res.send('User route'));
router.post(
  '/',
  [
    check('firstname', 'Firstname is required, please enter it')
      .not()
      .isEmpty(),
    check('lastname', 'Lastname is required, please enter it').not().isEmpty(),
    check('email', 'Email is required, please enter a valid one').isEmail(),
    check('password', 'Password must have 6 characters at least').isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstname,
      lastname,
      status,
      email,
      password,
      subscribe,
      readterms,
    } = req.body;
    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        //  console.log('user already exists');
        return res
          .status(400)
          .json({ errors: ['msg: user is already existant'] });
      }
      //Get user picture
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      user = new User({
        firstname,
        lastname,
        status,
        avatar,
        email,
        password,
        subscribe,
        readterms,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonWebToken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

router.post(
  '/:id',
  [
    auth,
    check('firstname', 'Firstname is required, please enter it')
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    console.log('  reqbody', req.params.id);
    console.log('  reqbody', req.body);
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
    var user = {
      firstname: req.body.firstname,
      status: req.body.status,
      avatar: req.body.avatar,
      subscribe: req.body.subscribe,
      readterms: req.body.readterms,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    console.log('  reqbody', req.body);
    User.findByIdAndUpdate(
      req.params.id,
      { $set: user },
      { new: true },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log(
            'Error in user update:' + JSON.stringify(err, undefined, 2)
          );
        }
      }
    );
  }
);

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in retrieving User:' + JSON.stringify, 2);
    }
  });
});
// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
