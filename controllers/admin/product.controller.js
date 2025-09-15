//[Get] /admin/products
const Product = require("../../models/product.model");
module.exports.index=async (req,res)=>{ 
    const products = await Product.find({
        deleted : false
    })
    res.render("admin/pages/product/index",{
        pageTitle : "Trang danh sách sản phẩm",
        products: products
    });
}