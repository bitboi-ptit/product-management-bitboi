const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTree= require("../../helpers/createTree");
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await ProductCategory.find(find);
    
    const newRecords = createTree.tree(records);
    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        records: newRecords
    });
};
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await ProductCategory.find(find);
   const newRecords = createTree.tree(records);
    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    });
};

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countProducts = await ProductCategory.countDocuments();
        req.body.position = countProducts + 1;
    }

    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}