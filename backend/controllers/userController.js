const User = require("../models/User");

const UserController = {
  //Register
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  AddUser: async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        isActive: req.body.isActive,
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  UpdateUser: async (req, res) => {
    try {
      const { username, email, password, role, isActive } = req.body;

      if (!username || !email || !role) {
        return res
          .status(400)
          .json({ message: "Vui lòng cung cấp đầy đủ thông tin cần thiết." });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, email, password, role, isActive },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }

      res.status(200).json({
        message: "Cập nhật người dùng thành công.",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Đã xảy ra lỗi trong quá trình cập nhật.",
        error: error.message,
      });
    }
  },
  delletedUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = UserController;
