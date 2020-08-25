const express = require('express');
//const axios = require('axios');
//const config = require('config');
const router = express.Router();
const auth = require('../../middelware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
//const normalize = require('normalize-url');
//const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');
//const Post = require('../../models/Post');

//route    Get api/profile
//@desc    Test route

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Veuillez choisir un statut').not().isEmpty(),
      check('subscribe', `Vous n'etes pas souscris`).not().isEmpty(),
      check('readterms', 'Veuillez accepter les termes').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, subscribe, readterms } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (status) profileFields.status = status;
    if (subscribe) profileFields.status = status;
    if (readterms) profileFields.status = status;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      }
      //create
      profile = new Profile(profileFields);
      await profile.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/*
    const { status, subscribe, readterms } = req.body;
    const profileFields = {
      user: req.user.id,
      status,
      subscribe,
      readterms,
    };
    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }*/
module.exports = router;
