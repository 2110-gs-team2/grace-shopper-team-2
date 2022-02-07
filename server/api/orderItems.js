const express = require("express");
const router = express.Router();
const {
  models: { OrderItem },
} = require("../db");
module.exports = router;

// GET all OrderItems
router.get("/", async (req, res, next) => {
  try {
    const products = await OrderItem.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET orderItems by orderId
router.get("/:orderId", async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
});
