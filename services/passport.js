const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create Local Strategy
const localOptions = { usernameField: "username" };
const localLogin = new LocalStrategy(localOptions, function(
  username,
  password,
  done
) {
  // verify username and password
  User.findOne({ where: { username: username } })
    .then(user => {
      if (user === null) {
        return done(null, false);
      } else if (!user.comparePassword(password)) {
        // verify password - need to decrypt to verify
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch(err => {
      return done(err);
    });
});

// setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// create jwt strategy
// function called when user loggs in (payload is decoded jwt token)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if userID in payload exists in db
  User.findByPk(payload.sub)
    .then(user => {
      if (user) {
        // if so call done with user
        return done(null, user);
      } else {
        // else call done without user
        return done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
});

// tell passport to use the strategy
passport.use(jwtLogin);
passport.use(localLogin);
