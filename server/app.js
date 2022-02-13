const {
  models: { User },
} = require("./db");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const passport = require("passport");
module.exports = app;
// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

//passport middlewares
require("./auth/passport")(passport);
app.use(passport.initialize());

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    console.log(user, "is the user found???");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/checkout", (req, res, next) => {
  try {
    res.sendFile(
      path.join(__dirname, "../public/checkout.html"),
      function (err) {
        if (err) {
          next(err);
        } else {
          console.log("Sent!!");
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
