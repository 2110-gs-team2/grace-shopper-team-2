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

// UPDATE existing order
router.put("/:orderId", async (req, res, next) => {
  try {
    const updatedOrder = await Order.findOne({
      where: { id: req.params.orderId },
    });
    updatedOrder.update(req.body);
    res.send(updatedOrder);
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

// CREATE new order
router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});
