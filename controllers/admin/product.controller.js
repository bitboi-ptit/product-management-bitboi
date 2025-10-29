const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
//[Get] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status
    }
    //-----------
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    //Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = await paginationHelper({
            limitItems: 4,
            currentPage: 1
        },
        req.query,
        countProducts);
    //End Pagination

    // Sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";

    }
    // End Sort

    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/product/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}
//[PATCH] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        status: status
    });

    req.flash('success', 'Cập nhật trạng thái thành công!');

    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);
}
//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "inactive":
        case "active":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: type
            });
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash('success', `Đã xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                console.log(position);
                await Product.updateOne({
                    _id: id
                }, {
                    position: position
                });
            }
            req.flash('success', `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }
    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);

}
//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // await Product.deleteOne({
    //     _id: id
    // }); 
    await Product.deleteOne({
        _id: id
    }, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash('success', `Đã xóa thành công sản phẩm!`);
    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);
}
//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };
    const category = await ProductCategory.find(find);
    const newcategory = createTreeHelper.tree(category);

    res.render("admin/pages/product/create", {
        pageTitle: "Thêm mới sản phẩm",
        category: newcategory
    });
}
//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }

    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };
        const product = await Product.findOne(find);
        res.render("admin/pages/product/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}
//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({
            _id: id
        }, req.body);
        req.flash("success", "Cập nhật thành công!!");
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!!");
    }
    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);
}
//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };
        const product = await Product.findOne(find);
        res.render("admin/pages/product/detail", {
            pageTitle: product.title,
            product: product
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}