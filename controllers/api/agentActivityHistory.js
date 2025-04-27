const { Op } = require("sequelize");
const { AgentLoginHistory } = require("../../models");
const logger = require("../../utils/logger");
const { ERR_MSG } = require("../../utils/constants");
const axios = require("axios");
const { sendError } = require("../../utils/telegram");

exports.getAllActivity = async (req, res) => {
    try {
        const { agentCode,action, startDate, endDate, search, dir, order, start, length } = req.body;

        const startDateFormated = new Date(new Date(startDate).setHours(0, 0, 0));
        const endDateFormated = new Date(new Date(endDate).setHours(24, 0, 0));

        let baseQuery = {
            [Op.or]: [{ agentCode: { [Op.substring]: search } },{ action: { [Op.substring]: search } }],
            createdAt: { [Op.between]: [startDateFormated, endDateFormated] },
        };

        let query;
        if (agentCode == "all") {
            if (action == "all") {
                query = { ...baseQuery, [Op.or]: [{ agentCode: req.session.auth.agentCode }] };
            } else {
                query = { ...baseQuery, [Op.or]: [{ agentCode: req.session.auth.agentCode , action:action }] };
            }
        } else {
            if (action == "all") {
                query = { ...baseQuery, agentCode: agentCode};
            } else {
                query = { ...baseQuery, agentCode: agentCode , action:action };
            }
        }

        const data = await AgentLoginHistory.findAndCountAll({
            where: query,
            offset: Number(start),
            limit: Number(length),
            order: [
                [order, dir],
                ["id", dir],
            ],
        });

        return res.json({
            status: 1,
            data: data.rows,
            start: Number(start),
            recordsTotal: data.count,
            recordsFiltered: data.count,
        });
    } catch (error) {
        logger("error", "API | Agent Activity History | Get All", `${error.message}`, req);
        sendError(error, "API | Agent Activity History | Get All",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getActivitydetails = async (req, res) => {
    try {
        const { ip } = req.params;
        const ipRes = await axios.get(`http://ip-api.com/json/${ip}?fields=66846719`);
        const mapUrl = `https://www.google.com/maps?q=${ipRes.data.lat},${ipRes.data.lon}`;

        return res.json({
            status: 1,
            mapUrl,
        });
    } catch (error) {
        logger("error", "API | Agent Activity History | Get Details", `${error.message}`, req);
        sendError(error, "API | Agent Activity History | Get Details",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};