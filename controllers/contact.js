const contacts = require("../repository");

const getContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
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
};

const createContact = async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
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
};

const updateContact = async (req, res, next) => {
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
};

const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;
  try {
    const result = await contacts.updateContact(req.params.contactId, {
      favorite,
    });
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
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
