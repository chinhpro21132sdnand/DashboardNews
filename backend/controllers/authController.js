const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
let listRefreshtoken = [];
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" } // Access Token hết hạn sau 1 giờ
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      { userId: user._id, role: user.role },
      process.env.REFESESH_KEY,
      { expiresIn: "7d" } // Refresh Token hết hạn sau 7 ngày
    );
  },
  //Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        isActive: req.body.isActive,
      });

      //save to DB
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  LoginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(404).json({ message: "User not found" });
      const valiPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!valiPassword) {
        res.status(401).json({ message: "Invalid Password" });
      }
      if (valiPassword && user) {
        const accesstoken = authController.generateAccessToken(user);
        const refreshtoken = authController.generateRefreshToken(user);
        listRefreshtoken.push(refreshtoken);
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user._doc;
        res.status(201).json({
          ...other,
          accessToken: accesstoken,
        });
      }
    } catch (error) {
      res.status(400);
    }
  },
  RefreshToken: async (req, res) => {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken)
      res.status(403).json({ message: "No refresh token provided2" });
    if (!listRefreshtoken.includes(refreshtoken)) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
    jwt.verify(refreshtoken, process.env.REFESESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      listRefreshtoken = listRefreshtoken.filter(
        (token) => token !== refreshtoken
      );
      const newaccesstoken = authController.generateAccessToken(user);
      const newrefreshToken = authController.generateRefreshToken(user);
      listRefreshtoken.push(newrefreshToken);
      res.cookie("refreshtoken", newrefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newaccesstoken });
    });
  },
  //Logout
  Logout: (req, res) => {
    res.clearCookie("refreshtoken");
    listRefreshtoken = listRefreshtoken.filter(
      (token) => token !== req.cookies.refreshtoken
    );
    res.status(200).json({ message: "Logged out successfully" });
  },
};

module.exports = authController;
