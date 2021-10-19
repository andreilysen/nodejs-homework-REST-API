const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { HttpCode } = require("../../config/constants");

const schemaUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  subscription: Joi.string().optional(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err.message);

    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateUser = async (req, res, next) => {
  return await validate(schemaUser, req.body, res, next);
};
