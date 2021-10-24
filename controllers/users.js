const jwt = require("jsonwebtoken");

const path = require("path");
const mkdirp = require("mkdirp");
const Users = require("../repository/users");
const UploadService = require("../services/file-upload");
const { HttpCode, Subscription } = require("../config/constants");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }
  try {
    const newUser = await Users.create({ email, password, subscription });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    });
  }
  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      token,
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  const user = await Users.currentUser(userId);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  const { email, subscription, avatar } = user;
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    date: {
      email,
      subscription,
      avatar,
    },
  });
};

const updateStatusUser = async (req, res, next) => {
  const userId = req.user._id;
  const { subscription } = req.body;

  if (
    subscription === Subscription.STARTER ||
    subscription === Subscription.PRO ||
    subscription === Subscription.BUSINESS
  ) {
    await Users.updateUserStatus(userId, { subscription });
    const user = await Users.currentUser(userId);
    const { email } = user;
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email,
        subscription,
      },
    });
  }
  return res.json({
    status: "error",
    message: "Unknown status",
  });
};

const uploadAvatar = async (req, res, next) => {
  const userId = String(req.user._id);
  const file = req.file;
  const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
  const destination = path.join(AVATAR_OF_USERS, userId);
  await mkdirp(destination);
  const uploadService = new UploadService(destination);
  const avatarURL = await uploadService.save(file, userId);
  await Users.updateAvatar(userId, avatarURL);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      avatar: avatarURL,
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateStatusUser,
  uploadAvatar,
};
