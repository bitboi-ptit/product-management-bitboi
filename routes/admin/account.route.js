const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/accounts.controller");
const multer = require('multer');
const upload = multer();
const validate = require("../../validates/admin/account.validate");
const uploadCloud = require("../../middlewares/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);
router.get(
    "/edit/:id",
    upload.single('avatar'),
    uploadCloud.upload,
    controller.edit 
)
router.patch(
    "/edit/:id",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch
)
module.exports = router;