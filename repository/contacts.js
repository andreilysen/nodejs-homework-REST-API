const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const contacts = await Contact.find({ owner: userId });

  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    page = 1,
  } = query;
  const searchOption = { owner: userId };
  if (favorite !== null) {
    searchOption.favorite = favorite;
  }
  const results = await Contact.paginate(searchOption, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: "owner",
      select: "email subscription ",
    },
  });
  const { docs: contacts } = results;
  delete results.docs;

  return { contacts, ...results };
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription ",
  });
  return contact;
};

const removeContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return contact.value;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
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
