const Joi = require("joi");

const schemas = {
    create: Joi.object({
        providerCode: Joi.string().required(),
        providerName: Joi.string().required(),
        providerEndpoint: Joi.string().required(),
        providerType: Joi.string().required(),
    }),
    update: Joi.object({
        providerCode: Joi.string().required(),
        providerName: Joi.string().required(),
        providerEndpoint: Joi.string().required(),
        providerType: Joi.string().required(),
    }),
    updateg: Joi.object({
        game_image: Joi.string().required(),
    }),
    setStatus: Joi.object({
        status: Joi.string().required(),
    }),
};

module.exports = schemas;
