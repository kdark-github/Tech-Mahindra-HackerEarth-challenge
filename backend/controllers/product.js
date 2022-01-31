const Product = require("../models/product");
const { validationResult } = require("express-validator");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products,
        total: products.length,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Internal Server error. Error while fetching products.";
      }
      next(error);
    });
};

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  if (!req.body.imageLink) {
    const error = new Error(
      "Please provide Image file or image url for the product."
    );
    error.statusCode = 422;
    throw error;
  }

  const { name, type, imageLink, price } = req.body;

  Product.findOne({ name })
    .then((result) => {
      if (result) {
        const error = new Error("A product with same name exists.");
        error.statusCode = 404;
        throw error;
      }

      const product = new Product({
        name,
        type,
        imageLink,
        price,
      });
      return product.save();
    })
    .then((result) => {
      res.status(201).json({
        product: result,
        message: "Product created successfully!.",
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

exports.updateProduct = (req, res, next) => {
  const productId = req.params.id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const { name, imageLink, price } = req.body;

  Product.findOne({ name })
    .then((result) => {
      if (result) {
        const error = new Error("A product with same name exists.");
        error.statusCode = 404;
        throw error;
      }
      return Product.findById(productId);
    })
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find product for given Id");
        error.statusCode = 404;
        throw error;
      }

      if (name) {
        product.name = name;
      }
      if (imageLink) {
        product.imageLink = imageLink;
      }
      if (price) {
        product.price = price;
      }

      return product.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "product updated successfully.",
        product: result,
      });
    })
    .catch((error) => {
      console.error("Error updating product ", productId);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
