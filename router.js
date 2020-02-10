const Authentication = require("./controllers/authentication");
const Pages = require("./controllers/pages");
const passportService = require("./services/passport");
const passport = require("passport");
const permit = require("./middleware/permissions");

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
  app.get("/secretAdmin", requireAuth, permit("admin"), Pages.secretAdmin);
  app.get(
    "/secret",
    requireAuth,
    permit("admin", "client", "supplier"),
    Pages.secretAllLoggedIn
  );
};
