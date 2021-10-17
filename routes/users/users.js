const express = require("express");
const router = express.Router();
const {
  signup,
  // login,
  // logout,
  // getCurrentUser,
} = require("../../controllers/users");
// const {
//   validateContact,
//   validateUpdateStatus,
//   validateId,
// } = require("./validation");

router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/current", getCurrentUser);

module.exports = router;
