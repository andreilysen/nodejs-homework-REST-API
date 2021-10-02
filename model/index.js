const crypto = require("crypto");
const ReadeWriteDB = require("./readWriteDB");
const db = new ReadeWriteDB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  if (!result) {
    const id = Number(contactId);
    const [result] = contacts.filter((contact) => contact.id === id);
    return result;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await db.write(contacts);
    return { message: "contact deleted" };
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await db.read();
  const newContact = { id: crypto.randomUUID(), ...body };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
