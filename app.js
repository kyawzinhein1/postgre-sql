const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./passport-config");

const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/product", productRoutes);
app.use("/auth", authRoutes);

// Routes
app.get("/", (req, res) => {
  res.send('<h1>Welcome! <a href="/auth/google">Log in with Google</a></h1>');
});

// // Dashboard route (protected)
// app.get("/dashboard", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   res.send(
//     `<h1>Welcome ${req.user.displayName}!</h1><a href="/logout">Logout</a>`
//   );
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
