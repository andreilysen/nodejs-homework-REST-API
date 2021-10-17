const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const {
  validateContact,
  validateUpdateStatus,
  validateId,
} = require("./validation");
const guard = require("../../helpers/guard");

router.get("/", guard, getContacts);

router.get("/:contactId", guard, validateId, getContactById);

router.post("/", guard, validateContact, createContact);

router.delete("/:contactId", guard, validateId, removeContact);

router.put("/:contactId", guard, [validateId, validateContact], updateContact);

router.patch(
  "/:contactId/favorite",
  guard,
  [validateId, validateUpdateStatus],
  updateStatusContact
);

module.exports = router;
