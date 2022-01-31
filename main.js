console.log(
  "----------------------------------------- Node js -----------------------------------------"
);
require('dotenv').config()
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoute = require("./backend/routes/product");
const productTypeRoute = require("./backend/routes/productType");

const fileFilter = (res, file, cd) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cd(null, true);
  } else {
    cd(null, false);
  }
};

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  next();
});

app.use("/product", productRoute);
app.use("/type", productTypeRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 404;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(8080);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.ytkmv.mongodb.net/MahindraChallengeHE?retryWrites=true&w=majority`, // If username or password contains special chars please ref :- https://docs.atlas.mongodb.com/troubleshoot-connection/#special-characters-in-connection-string-password

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("MongoDB database connection successfull", result);
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB");
  });
