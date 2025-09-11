const express = require("express"); // import để sử dụng hàm Router trong express
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("client/pages/products/index");
});

module.exports = router;
