const express = require("express");
const productTypeController = require("../controllers/productType");
const { body } = require("express-validator");

const router = express.Router();

router.get("/all", productTypeController.getProductsTypes);

router.post(
  "/",
  [body("name").trim().isLength({ min: 2, max: 150 })],
  productTypeController.createProductType
);

module.exports = router;
