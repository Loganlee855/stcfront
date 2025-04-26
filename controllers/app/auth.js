exports.login = async (req, res) => {
    if (req.session.auth) {
        return res.redirect("/dashboard");
    } else {
        return res.render("auth/login.ejs");
    }
};
