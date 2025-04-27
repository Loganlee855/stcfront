const { Op } = require("sequelize");
const { Agent, Message } = require("../../models");
const logger = require("../../utils/logger");
const { ERR_MSG } = require("../../utils/constants");
const { dot, det } = require("../../utils/common");
const { sendError } = require("../../utils/telegram");


exports.getRealTimeInfo = async (req, res) => {
    try {
        const agent = await Agent.findByPk(req.session.auth.id);
        if (!agent) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_AGENT,
            });
        }

        // lower agent total balance
        const lowerAgentTotalBalance = await Agent.sum("balance", {
            where: {
                parentPath: { [Op.substring]: `.${agent.id}.` },
            },
        });

        // messages
        const messages = await Message.findAll({
            where: {
                [Op.or]: [{ readStatus: 0 }, { answerStatus: 0 }],
                [Op.and]: [{ receiverCode: agent.agentCode }],
            },
        });

        return res.json({
            status: 1,
            result: {
                encData: dot({
                    agentBalance: agent.balance,
                    agentCurrency: agent.currency,
                    lowerBalance: lowerAgentTotalBalance,
                    messages,
                }),
            },
        });
    } catch (error) {
        logger("error", "API | Message | Get All", `${error.message}`, req);
        sendError(error, "API | Message | Get All",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};
