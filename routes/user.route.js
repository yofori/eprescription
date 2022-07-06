const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const { adminAuth, userAuth } = require("../middleware/auth");
router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/promote").put(adminAuth, user.update);
router.route("/delete").delete(adminAuth, user.deleteUser);
router.route("/verify/:confirmationCode").get(user.verifyUser);
router.route("/getallusers").get(userAuth, user.getAllUsers);

module.exports = router;