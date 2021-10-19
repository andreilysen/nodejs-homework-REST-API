const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { HttpCode } = require("../../config/constants");

const schemaContact = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[(][0-9]{3}[)][ ]{0,1}[0-9]{3}[-][0-9]{4}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaId = Joi.object({
  contactId: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    if (!obj.favorite) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: `missing field favorite, ${err.message.replace(/"/g, "")}`,
      });
    }
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateUpdateStatus = async (req, res, next) => {
  return await validate(schemaUpdateStatus, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
