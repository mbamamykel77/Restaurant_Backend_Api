import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../../models/user.model.js";

const findOrCreate = async (profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      done(null, existingUser);
      
    } else {
      const newUser = new User({
        googleId: profile.id,
        email: profile.email, // Extract email from Google profile
        fullName: profile.displayName, // Extract displayName from Google profile
      });

      await newUser.save();
      done(null, newUser);
    }
  } catch (err) {
    console.error(err);
    done(err);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/viviskitchen/google/redirect",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      findOrCreate(profile, done);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
