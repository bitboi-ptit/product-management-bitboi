const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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
    //---------
    const countProducts = await Product.countDocuments(find);
    let objectPagination = await paginationHelper({
            limitItems: 4,
            currentPage: 1
        },
        req.query,
        countProducts);
    //----------
    const products = await Product.find(find)
        .sort({
            position: "desc"
        })
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
            break;
        case "change-position":
            for (const item of ids) {
                const [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateMany({
                    id: id
                }, {
                    position: position
                });
            }
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
    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);
}