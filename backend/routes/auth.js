const authController = require("../controllers/authController");

const router = require("express").Router();

//REGISTER
router.post("/register", authController.registerUser);
//LOGIN
router.post("/login", authController.LoginUser);
//REFRESSTOKEN
router.post("/refresh", authController.RefreshToken);
//LOGOUT
router.post("/logout", authController.Logout);
module.exports = router;
