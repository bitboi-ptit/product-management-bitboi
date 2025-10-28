const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTree = require("../../helpers/createTree");
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
//[GET] /admin/products-category/create
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

//[GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ProductCategory.findOne({
            deleted: false,
            _id: id
        });
        const records = await ProductCategory.find({
            deleted: false
        });
        const newRecords = createTree.tree(records);
        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin }/products-category`);
    }

};

//[PATCH] /admin/products-category/edit/:id
module.exports.editPATCH = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);
    await ProductCategory.updateOne({
        _id: id
    }, req.body);
    req.flash('success', 'Cập nhật thành công!');
    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);
};