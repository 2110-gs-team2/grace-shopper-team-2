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
router.get("/order/:orderId", async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// UPDATE orderItem
router.put("/:id", async (req, res, next) => {
  try {
    const updatedItem = await OrderItem.findOne({
      where: { id: req.params.id },
    });
    updatedItem.update(req.body);
    console.log(updatedItem, "upated tiem");
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

// CREATE new orderItem
router.post("/", async (req, res, next) => {
  try {
    const newOrderItem = await OrderItem.create(req.body);
    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
});

// DELETE an orderItem
router.delete("/:id", async (req, res, next) => {
  try {
    const orderItemToDelete = await OrderItem.findByPk(req.params.id);
    await orderItemToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
