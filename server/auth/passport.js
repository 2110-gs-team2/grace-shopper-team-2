const { parsed: env } = require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  models: { User },
} = require("../db");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/redirect/google",
      },
      async function (accessToken, refreshToken, profile, done) {
        profile = profile._json;
        try {
          const user = await User.findOrCreate({
            where: { passportId: profile.sub },
            defaults: {
              passportId: profile.sub,
              firstName: profile.given_name,
              lastName: profile.family_name,
              email: profile.email,
              role: "CUSTOMER",
            },
          });
          done(null, user);
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id, function (err, user) {
      done(err, user);
    });
  });
};
