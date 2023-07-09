const userObj = require("./models/User");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

function initialize(passport) {
  const authenticate = async (username, password, done) => {
    // console.log(".....", username, password);
    const user = await userObj.findOne({ username });
    // console.log(user);
    if (!user) {
      return done(null, false, { message: "no user with that username" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        // console.log("me here");
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy(authenticate));

  passport.serializeUser((user, done) => {
    console.log("inside serializeUser");
    // console.log(user.id);
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("inside deserializeUser");
    try {
      const user = await userObj.findById(id);
      if (user) {
        done(null, user);
      }
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;
