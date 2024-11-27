exports.loginSuccess = (req, res) => {
  if (req.isAuthenticated()) {
    res
      .status(200)
      //   .json({
      //     success: true,
      //     message: "Successfully logged in",
      //     user: req.user,
      //   })
      .send(
        `<h1>Welcome ${req.user._json.name}!</h1> <p>${req.user._json.email}</p> <a href="/auth/logout">Logout</a>`
      );
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
};

exports.loginFailure = (req, res) => {
  res.status(401).json({ success: false, message: "Login failed" });
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.status(200).redirect("/");
  });
};
