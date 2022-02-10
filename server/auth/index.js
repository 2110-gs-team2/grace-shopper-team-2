const router = require("express").Router();
const passport = require("passport");
const {
  models: { User },
} = require("../db");
const app = require("../app");
module.exports = router;

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    const passportId = req.user[0].dataValues.passportId;
    const token = await User.authenticateViaGoogle(passportId);
    res.send(`
      <html>
       <body>
       <script>
        window.localStorage.setItem('token', '${token}');
        window.document.location = '/';
       </script>
        </body>
      </html>
    `);
    // res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
