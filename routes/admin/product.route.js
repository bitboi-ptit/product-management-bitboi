const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");

router.get("/",controller.index);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.get("/create",controller.create);
router.post("/create",controller.createPost);
module.exports=router;