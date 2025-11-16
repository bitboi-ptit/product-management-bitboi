const Account = require("../../models/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

//[GET] admin/auth/login
module.exports.login = (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.render("admin/pages/auth/login", {
            pageTitle: "Đăng nhập"
        })
    }

}
//[POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await Account.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        const backURL = req.get("Referer");
        res.redirect(`${backURL}`);

        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "Mật khẩu sai");
        const backURL = req.get("Referer");
        res.redirect(`${backURL}`);

        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa");
        const backURL = req.get("Referer");
        res.redirect(`${backURL}`);

        return;
    }
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}
//[GET] admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}