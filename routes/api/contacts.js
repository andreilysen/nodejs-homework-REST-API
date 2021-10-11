const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contact");
const {
  validateContact,
  validateUpdateStatus,
  validateId,
} = require("./validation");

router.get("/", getContacts);

router.get("/:contactId", validateId, getContactById);

router.post("/", validateContact, createContact);

router.delete("/:contactId", validateId, removeContact);

router.put("/:contactId", [validateId, validateContact], updateContact);

router.patch(
  "/:contactId/favorite",
  [validateId, validateUpdateStatus],
  updateStatusContact
);

module.exports = router;
