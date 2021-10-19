const User = require("../model/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  console.log(user);

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const currentUser = async (id) => {
  return await User.findById(id);
};

const updateUserStatus = async (id, subscription) => {
  return await User.updateOne({ _id: id }, subscription);
};

module.exports = {
  findByEmail,
  create,
  updateToken,
  currentUser,
  updateUserStatus,
};
