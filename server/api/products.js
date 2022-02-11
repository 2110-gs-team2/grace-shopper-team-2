const express = require("express");
const router = express.Router();
const { models: { Product } } = require("../db");
const { isUUID } = require("../utils");
module.exports = router;

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  }
  catch (error) {
    next(error);
  }
});

// GET individual product
router.get("/:id", async (req, res, next) => {
  try {
    let product;
    // If id is a uuid, retrieve product by uuid otherwise retrieve product by slug
    if (isUUID(req.params.id)) {
      product = await Product.findByPk(req.params.id);
    }
    else {
      product = await Product.findOne({ where: { slug: req.params.id } });
    }
    res.json(product);
  }
  catch (error) {
    next(error);
  }
});
