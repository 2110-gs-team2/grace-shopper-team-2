const express = require("express");
const router = express.Router();
const {
  models: { Product, User },
} = require("../db");
const { isUUID } = require("../utils");
module.exports = router;

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
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
    } else {
      product = await Product.findOne({ where: { slug: req.params.id } });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// ADD new product
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    if (user && user.role === "ADMIN") {
      const newProduct = await Product.create(req.body.product);
      res.send(newProduct);
    } else {
      const error = Error("Not authorized to perform this action.");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// UPDATE an individual product's information
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    if (user && user.role === "ADMIN") {
      product.update(req.body);
      res.send(product);
    } else {
      const error = Error("Not authorized to perform this action.");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// DELETE an individual product
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user && user.role === "ADMIN") {
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.sendStatus(204);
    } else {
      const error = Error("Not authorized to perform this action.");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});
