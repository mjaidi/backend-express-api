const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); // information we want to encode, secret string
}

exports.signup = async function(req, res, next) {
  // get information from request object
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password || !username) {
    return res
      .status(422)
      .send({ error: "please send request with username, email and password" });
  }
  // see if user with email exists return error
  const user = await User.findOne({ where: { username: username } });
  if (user !== null) {
    return res.status(422).send({ error: "username is in use" });
  } else {
    const newUser = new User({
      username: username,
      email: email,
      password: password
    });
    newUser.save(function(err) {
      if (err) {
        return next(err);
      }
    }); // pass callback as operation is async
    // respond to request
    res.json({ token: tokenForUser(newUser) });
  }
};

exports.signin = function(req, res, next) {
  res.json({ token: tokenForUser(req.user) });
};
