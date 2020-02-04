const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // a route
  app.get("/", requireAuth, function(req, res, next) {
    // req = request, res = response that will be sent back, next = for error handling
    res.send({ hi: "there" });
  });
  app.post("/signup", Authentication.signup);
  app.post("/signin", requireSignIn, Authentication.signin);
};
