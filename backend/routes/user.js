const middlewareController = require("../controllers/middleware");
const UserController = require("../controllers/userController");

const router = require("express").Router();
//Getallusers
router.get("/", middlewareController.verifyToken, UserController.getAllUser);

//addUser
router.post(
  "/addUser",
  middlewareController.verifytokenandAdmin,
  UserController.AddUser
);
//UpdateUser
router.post(
  "/updateUser",
  middlewareController.verifytokenandAdmin,
  UserController.UpdateUser
);
//dellete
router.delete(
  "/:id",
  middlewareController.verifytokenandAdmin,
  UserController.delletedUser
);
module.exports = router;
