const router = require("express").Router();
const {
  models: { Order, User, OrderItem, Product },
} = require("../db");
module.exports = router;

//middleware
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

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
    const order = await Order.findOne({
      where: { id: req.params.orderId },
      include: [OrderItem],
    });
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
router.get("/user/:userId", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: { userId: req.user.id },
      include: [OrderItem],
    });
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
