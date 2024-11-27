const express = require("express");
const passport = require("passport");

const router = express.Router();
const authController = require("../controllers/auth");

// login with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Successful login
    res.redirect("/auth/success");
  }
);

// Login success route
router.get("/success", authController.loginSuccess);

// Login failure route
router.get("/failure", authController.loginFailure);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
