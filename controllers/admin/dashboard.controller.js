const systemConfig = require("../../config/system");

module.exports.dashboard = (req, res) => {
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        PATH_ADMIN: systemConfig.prefixAdmin
    });
};