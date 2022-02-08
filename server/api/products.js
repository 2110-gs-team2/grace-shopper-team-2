const express = require('express');
const router = express.Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// GET all products
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET individual product
router.get('/:products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});
