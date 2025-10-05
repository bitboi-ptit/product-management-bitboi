const Product = require("../../models/product.model");
//[Get] /products
module.exports.index = async (req, res) => {
    //-Day la cac dieu loc
    const products = await Product.find({
        status: 'active',
        deleted: false
    }).sort({
        position: "desc"
    });

    const newProducts = products.map((item) => {
        item.newPrice = (item.price - item.price * (item.discountPercentage / 100)).toFixed(0);
        return item;
    });
    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: newProducts // trả products ra file index.pug (product)
    });
}
//[Get] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            status:'active',
            slug: req.params.slug
        };
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });

    } catch (error) {
        res.redirect(`/products`);
    }

}