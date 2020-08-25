const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    required: true,
  },
  subscribe: {
    type: Boolean,
    required: true,
  },
  readterms: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model('profile', ProfileSchema);
