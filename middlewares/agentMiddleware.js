module.exports = function checkType(allowedType) {
  return function (req, res, next) {
    const user = req.session.auth;

    if (!user) {
      return res.redirect("/login");
    }

    if (!allowedType.includes(user.agentType)) {
      return res.render("rest/404");
    }

    next();
  };
};
