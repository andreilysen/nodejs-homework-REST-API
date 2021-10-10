const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
    res.status(400).json({
      status: "error",
      code: 400,
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
