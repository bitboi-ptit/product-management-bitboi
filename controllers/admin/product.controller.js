//[Get] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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
    //---------
    const countProducts = await Product.countDocuments(find);
    let objectPagination = await paginationHelper({
        limitItems: 4,
        currentPage: 1
    }, 
    req.query, 
    countProducts);
    //----------
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.render("admin/pages/product/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}