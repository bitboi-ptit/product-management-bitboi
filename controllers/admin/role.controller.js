const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

//[GET]admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index", {
        pageTitle: "Trang Nhóm Quyền",
        records: records
    });
};
//[GET]admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo Nhóm Quyền"
    });
};
//[POST]admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
//[GET]admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };
        const data = await Role.findOne(find);
        res.render("admin/pages/roles/edit", {
            pageTitle: "Chỉnh sửa Nhóm Quyền",
            data: data
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
};
//[PATCH]admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        await Role.updateOne({
            _id: id
        }, req.body);

        req.flash('success', 'Cập nhật thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công!');
    }
    const backURL = req.get('Referer');
    res.redirect(`${backURL}`);
};
//[GET]admin/roles/permission
module.exports.permission = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/permission", {
        pageTitle: "Phân quyền",
        records: records
    });
};
//[PATCH]admin/roles/permission
module.exports.permissionPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions);
        permissions.forEach(async item => {
            await Role.updateOne({
                _id: item.id
            }, {
                permission: item.permissions
            });
        });
        req.flash("success", "Cập nhật thành công");
    } catch (error) {
        req.flash("error","Cập nhật không thành công");
    }

    const backURL = req.get("Referer");
    res.redirect(`${backURL}`);
};