const passport = require('passport');
const UserModel = require('../models/user');

module.exports = function () {

  passport.serializeUser((user, done) => {
    console.log("====>serializeUser")
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("====>deserializeUser")
    try {
      let user = await UserModel.findOne({ _id: id }, '-password -salt');
      return done(null, user);
    } catch (error) {
      done(error);
    }
  });

  require('./local')();
};