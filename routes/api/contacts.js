const express = require("express");
const router = express.Router();
const contacts = require("../../model");
const { validateContact, validateUpdate } = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (result) {
      return res.json({ status: "success", code: 200, data: { result } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateContact, async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (result) {
      return res.json({ status: "success", code: 200, data: { result } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});
router.put("/:contactId", validateContact, async (req, res, next) => {
  try {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (result) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { result } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", validateUpdate, async (req, res, next) => {
  try {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (result) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { result } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
