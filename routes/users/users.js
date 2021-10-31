const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateStatusUser,
  uploadAvatar,
  verifyUser,
  repeatSendEmail,
} = require("../../controllers/users");
const { validateUser } = require("./validation");
const guard = require("../../helpers/guard");
const upload = require("../../helpers/uploads");

router.post("/signup", validateUser, signup);
router.post("/login", validateUser, login);
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);
router.patch("/subscription", guard, updateStatusUser);
router.patch("/avatars", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:token", verifyUser);
router.post("/verify", repeatSendEmail);

module.exports = router;
