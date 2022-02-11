const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email", "firstName", "lastName", "role"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET an individual user
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// UPDATE an individual user's information
router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.body, "this is req body");
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    user.update(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
