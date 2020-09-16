const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  avatar: {
    type: String,
  },
  subscribe: {
    type: Boolean,
    //  default: false,
  },
  readterms: {
    type: Boolean,
    default: true,
  },
});
// Methods
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};
module.exports = User = mongoose.model('user', UserSchema);

/*
module.exports.authenticate = (req, res, next) => {
  // call for passport authentication

  passport.authenticate('local', (err, pagolin, info) => {   
  console.log("pagolin auth"+pagolin.email);   
      // error from passport middleware
      if (err) return res.status(400).json(err);
      // registered pagolin
      else if (pagolin) 
      {console.log("resultat authentifiate YES email="+res.email)
          return res.status(200).json({ "token": pagolin.generateJwt() });
      }
      // unknown pagolin or wrong password
      else
      { console.log("resultat authentifiate NON email="+res.email)
          return res.status(404).json(info);
      }
  })(req, res);
}
*/
