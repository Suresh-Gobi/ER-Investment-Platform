const passport = require("passport");

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

(exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
})),
  (req, res) => {
    res.redirect("/");
  };

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
