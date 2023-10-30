import express from "express";
import passport from "passport";
import userController from "../controllers/userController/user.auth.js";
import userloginController from "../controllers/userController/user.login.js";
import "../controllers/userController/google.auth.js";

const router = express.Router();

// Login route
router.get("/login", (req, res) => {
  res.render("login");
});

// Traditional signup and logout routes
router.post("/signup", userController.signup);
router.post("/signin", userloginController.signin);

// google sign up auth route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// redirect route after interacting with google service
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/viviskitchen/google/success",
    failureRedirect: "/viviskitchen/google/success",
  })
);

// callback route after successful sign up/ login with the google service
router.get("/google/success", (req, res) => {
  res.send("you have reached the callback uri");
});
router.get("/google/failure", (req, res) => {
  res.send("ERROR: Couldn't connect to Google");
});

// logout route
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

export { router };
