var GoogleStrategy =    require('passport-google-oauth20').Strategy;
const router =          require('express').Router();
const passport =        require("passport");
const mongoose =        require('mongoose');
const Users =           require('../models/users');

const callback_url = process.env.ENDPOINT_URL || "http://localhost:3000";

passport.use(new GoogleStrategy({
  clientID: '1002827805875-nuc8chhmq7u5etofvfuvhqonpmclbdfb.apps.googleusercontent.com',
  clientSecret: 'Gpw0ZSVkjI33ZRVQXNupvcM9',
  callbackURL: callback_url + "/auth/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    let { displayName, emails, photos, name } = req.user;
    let { id, domain } = req.user._json;

    try {
        let query = await Users.findOne({ google_id: id }).exec();
        if (query === null) {
            var newUser = {
                name: displayName,
                email: emails[0].value,
                profilePic: photos[0].value,
                google_id: id
            };
        }
    }
    catch (err) {
        console.log(err);
    }
  });

module.exports = router;
