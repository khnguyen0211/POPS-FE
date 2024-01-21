const express = require("express");
const router = express.Router();
const productsRouter = require("../controllers/ProductsController");

router.get("/products", productsRouter.index);

router.get("/products/products-detail", productsRouter.detail);
//////send data

module.exports = router;
