module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập Email !!");
        const backURL = req.get('Referer');
        res.redirect(`${backURL}`);
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập Password !!");
        const backURL = req.get('Referer');
        res.redirect(`${backURL}`);
        return;
    }
    next();
}