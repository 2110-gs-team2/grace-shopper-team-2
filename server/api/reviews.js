const router = require("express").Router();
const {
  models: { Order, User, OrderItem, Product, Review },
} = require("../db");
module.exports = router;

// GET all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// GET individual product's reviews
router.get("/product/:productId", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [User],
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});
