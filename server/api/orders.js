const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

// GET all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET individual order
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// GET individual user's set of orders
router.get("/user/:userId", async (req, res, next) => {
  try {
    const order = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(order);
  } catch (error) {
    next(error);
  }
});
