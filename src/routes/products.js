const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/products", productController.index);
router.get("/products/new", productController.new);
router.post("/products/create", productController.create);
router.get("/products/:id", productController.show);
router.post("/products/:id/destroy", productController.destroy);
router.get("/products/:id/edit", productController.edit);
router.post("/products/:id/update", productController.update);

module.exports = router;