const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateStatusUser,
} = require("../../controllers/users");
const { validateUser } = require("./validation");
const guard = require("../../helpers/guard");

router.post("/signup", validateUser, signup);
router.post("/login", validateUser, login);
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);
router.patch("/subscription", guard, updateStatusUser);

module.exports = router;
