const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(6).required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(1).max(30),
  email: Joi.string().email(),
  phone: Joi.number().min(6),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateUpdate = async (req, res, next) => {
  return await validate(schemaUpdate, req.body, res, next);
};
