const { prefixAdmin } = require("../../config/system");
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
//const systemConfig = require("../../config/system");
module.exports =(app)=>{
    //const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(`${prefixAdmin}/dashboard`,dashboardRoute);
    app.use(`${prefixAdmin}/products`,productRoute);
}