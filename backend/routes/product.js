const express = require("express");
const productController = require("../controllers/product");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2, max: 150 }),
    body("price").isNumeric(),
  ],
  productController.createProduct
);

router.get("/all", productController.getProducts);

router.patch("/:id", productController.updateProduct);

module.exports = router;
