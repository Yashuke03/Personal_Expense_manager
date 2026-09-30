const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const tokenFor = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6)
      return res.status(400).json({
        message:
          "Name, valid email, and password of at least 6 characters are required.",
      });
    if (await User.findOne({ email: email.toLowerCase() }))
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json({ message: "Account created. Please log in." });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() });
    if (
      !user ||
      !(await bcrypt.compare(req.body.password || "", user.password))
    )
      return res.status(401).json({ message: "Invalid email or password." });
    res.json({
      token: tokenFor(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
exports.me = async (req, res, next) => {
  try {
    const u = await User.findById(req.user.id).select("-password");
    res.json(u);
  } catch (e) {
    next(e);
  }
};
