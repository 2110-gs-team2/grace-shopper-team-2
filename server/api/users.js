const router = require("express").Router();
const {
  models: { User },
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

// GET all users
router.get("/", requireToken, async (req, res, next) => {
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
    const user = await User.findByToken(req.body.token);
    if (user) {
      user.update(req.body.user);
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

// CREATE a guest user
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, role: "CUSTOMER" });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
