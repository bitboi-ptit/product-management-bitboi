const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
//const systemConfig = require("../../config/system");
module.exports =(app)=>{
    //const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(`${prefixAdmin}/dashboard`,dashboardRoutes);
    app.use(`${prefixAdmin}/products`,productRoutes);
    app.use(`${prefixAdmin}/products-category`,productCategoryRoutes);
}