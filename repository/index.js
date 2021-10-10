const Contact = require("../model");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return await contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return await contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId });
  return contact.value;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
