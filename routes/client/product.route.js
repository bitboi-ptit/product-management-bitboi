const express = require("express"); // import để sử dụng hàm Router trong express
const router = express.Router();
const controller = require("../../controllers/client/product.controller");

router.get("/",controller.index);

router.get("/:slug",controller.detail);
module.exports = router;
