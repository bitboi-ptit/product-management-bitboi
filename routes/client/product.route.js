const express = require("express"); // import để sử dụng hàm Router trong express
const router = express.Router();
const controller = require("../../controllers/client/product.controller");

router.get("/",controller.index);
module.exports = router;
