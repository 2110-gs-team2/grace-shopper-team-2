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
    if (req.body.token) {
      let user = await User.findByToken(req.body.token);
      user.update(req.body.user);
      res.send(user);
    }
    // if user is guest only let them change non critical info
    else {
      let user = await User.findByPk(req.params.id);
      user.update({
        addressLine1: req.body.user.addressLine1,
        addressLine2: req.body.user.addressLine2,
        city: req.body.user.city,
        state: req.body.user.state,
        zipcode: req.body.user.zipcode,
      });
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
