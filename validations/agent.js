const Joi = require("joi");

const schemas = {
    create: Joi.object({
        data: Joi.string().required(),
    }),

    update: Joi.object({
        agentName: Joi.string(),
        agentType: Joi.number().integer().min(0),
        apiType: Joi.number().integer().min(0),
        password: Joi.string().allow("", null).optional(),
        percent: Joi.number().min(0).max(100),
        status: Joi.number().integer().min(0),
        ipAddress: Joi.string().allow("").optional(),
        memo: Joi.string().allow("").optional(),
        adminMemo: Joi.string().allow("").optional(),
    }),

    updatePass: Joi.object({
        password: Joi.string(),
        new_password: Joi.string(),
        new_password_confirm: Joi.string(),
    }),

    exchange: Joi.object({
        agentId: Joi.string().guid({ version: 'uuidv4' }).required(),
        amount: Joi.number().greater(0).required(),
        chargeType: Joi.number().integer().min(0).required(),
    }),

    checkCode: Joi.object({
        agentCode: Joi.string().required(),
    }),

    profile: Joi.object({
        password: Joi.string().required(),
        memo: Joi.string().allow("").optional(),
    }),

    changeRtp: Joi.object({
        rtp: Joi.number().min(0).max(100).required(),
    }),
};

module.exports = schemas;
