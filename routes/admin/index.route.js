const {
    prefixAdmin
} = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");

const authMiddlewares=require("../../middlewares/auth.middleware");

//const systemConfig = require("../../config/system");
module.exports = (app) => {
    //const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(`${prefixAdmin}/dashboard`,authMiddlewares.requireAuth, dashboardRoutes);
    app.use(`${prefixAdmin}/products`,authMiddlewares.requireAuth, productRoutes);
    app.use(`${prefixAdmin}/products-category`,authMiddlewares.requireAuth, productCategoryRoutes);
    app.use(`${prefixAdmin}/roles`,authMiddlewares.requireAuth, roleRoutes);
    app.use(`${prefixAdmin}/accounts`,authMiddlewares.requireAuth, accountRoutes);
    app.use(`${prefixAdmin}/auth`, authRoutes);
}