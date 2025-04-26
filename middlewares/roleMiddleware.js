module.exports = function checkRole(allowedRoles) {
  return function (req, res, next) {
    const user = req.session.auth;

    if (!user) {
      return res.redirect("/login");
    }

    if (!allowedRoles.includes(user.role)) {
      return res.redirect("/dashboard");
    }

    next();
  };
};
