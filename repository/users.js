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

const updateTokenVerify = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

const currentUser = async (id) => {
  return await User.findById(id);
};

const updateUserStatus = async (id, subscription) => {
  return await User.updateOne({ _id: id }, subscription);
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

const findUserByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

module.exports = {
  findByEmail,
  create,
  updateToken,
  updateTokenVerify,
  currentUser,
  updateUserStatus,
  updateAvatar,
  findUserByVerifyToken,
};
