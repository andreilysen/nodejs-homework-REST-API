const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  // getCurrentUser,
} = require("../../controllers/users");
// const {
//   validateContact,
//   validateUpdateStatus,
//   validateId,
// } = require("./validation");
const guard = require("../../helpers/guard");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", guard, logout);
// router.get("/current", getCurrentUser);

module.exports = router;
