const ProductType = require("../models/productType");
const { validationResult } = require("express-validator");

exports.getProductsTypes = (req, res, next) => {
  ProductType.find()
    .then((types) => {
      res.status(200).json({
        message: "Product types fetched successfully!",
        types,
        total: types.length,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message =
          "Internal Server error. Error while fetching product types.";
      }
      next(error);
    });
};

exports.createProductType = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const { name } = req.body;

  ProductType.findOne({ name })
    .then((result) => {
      if (result) {
        const error = new Error("A product type with same name exists.");
        error.statusCode = 404;
        throw error;
      }
      const productType = new ProductType({
        name,
      });
      return productType.save().then((savedResult) => {
        res.status(201).json({
          productType: savedResult,
          message: "Product type created successfully!.",
        });
      });
    })
    .catch((error) => {
      console.error("Error creating product!.");

      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
