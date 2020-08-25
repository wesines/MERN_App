const express = require('express');
const router = express.Router();
//route    Get api/Posts
//@desc    Test route
//@access  Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
