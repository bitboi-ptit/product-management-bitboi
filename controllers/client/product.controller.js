const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    //-Day la cac dieu loc
    const products = await Product.find({
        status :'active',
        deleted : false
    });
    console.log(products);
    const newProducts = products.map((item)=>{
        item.newPrice = (item.price - item.price*(item.discountPercentage/100)).toFixed(0);
        return item;
    });
    console.log(newProducts);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: newProducts // trả products ra file index.pug (product)
    });
}