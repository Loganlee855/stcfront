const { Op } = require("sequelize");
const { Transaction } = require("../../models");
const logger = require("../../utils/logger");
const { sendError } = require("../../utils/telegram");
const { ERR_MSG } = require("../../utils/constants");
const axios = require("axios");
const MD5 = require("md5.js");
const config = require("../../config/main");

exports.getAllGameTransactions = async (req, res) => {
    try {
        const { search, order, dir, agentCode,provider_code,game_code, userCode, length, start, startDate, endDate } = req.body;
        console.log(game_code);

        const startDateFormated = new Date(new Date(startDate).setHours(0, 0, 0));
        const endDateFormated = new Date(new Date(endDate).setHours(24, 0, 0));

        let baseQuery = { createdAt: { [Op.between]: [startDateFormated, endDateFormated] } };

        let query;
        if (agentCode == "all" && userCode == "all") {
            query = {
                ...baseQuery,
            };
        } else if (provider_code == "all" && game_code == "all") {
            query = {
                ...baseQuery,
            };
        } else if (provider_code != "all" && game_code == "all") {
            query = {
                ...baseQuery,
                provider_code: provider_code,
            };
        } else if (provider_code != "all" && game_code != "all") {
            query = {
                ...baseQuery,
                provider_code: provider_code,
                game_code: game_code,
            };
        } else if (agentCode == "all" && userCode != "all") {
            query = {
                ...baseQuery,
                userCode: userCode,
            };
        } else if (agentCode != "all" && userCode == "all") {
            query = {
                ...baseQuery,
                agentCode: agentCode,
            };
        } else if (agentCode != "all" && userCode != "all") {
            query = {
                ...baseQuery,
                agentCode: agentCode,
                userCode: userCode,
            };
        } else {
            query = {
                ...baseQuery,
                agentCode: agentCode,
                userCode: userCode,
                provider_code: provider_code,
                game_code: game_code,
            };
        }
        let gameTransactions = [];
        gameTransactions = await Transaction.findAndCountAll({
            where: {
                [Op.or]: [
                    { agentCode: { [Op.substring]: search } },
                    { userCode: { [Op.substring]: search } },
                    { provider_code: { [Op.substring]: search } },
                    { action: { [Op.substring]: search } },
                    { game_name: { [Op.substring]: search } },
                ],
                [Op.and]: query,
            },
            offset: Number(start),
            limit: Number(length),
            order: [
                [order, dir],
                ["id", dir],
            ],
        });

        return res.json({
            status: 1,
            data: gameTransactions.rows,
            count: gameTransactions.count,
        });
    } catch (error) {
        logger("error", "API | Game Transaction | Get All", `${error.message}`, req);
        sendError(error, "API | Game Transaction | Get All",req.originalUrl);

        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getTransactionsDetails = async (req, res) => {
    try {
        const sechash = {
            secureLogin: req.session.auth.secureLogin,
            secretKey: req.session.auth.secretkey,
        };

        const hash = new MD5().update(new URLSearchParams(sechash).toString()).digest("hex");

        const params = {
            secureLogin: req.session.auth.secureLogin,
            hash: hash,
        };

        const encodedData = new URLSearchParams(params).toString();

        const url = config.aasEndpoint + `IntegrationService/http/HistoryAPI/GetGameRounds/${req.params.round_id}/details`;

        const response = await axios.post(url, encodedData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.data.error == 0) {
            return res.json({
                status: 1,
                data: response.data.data,
            });
        } else {
            return res.json({
                status: 0,
                msg: response.data.description,
            });
        }
    } catch (error) {
        logger("error", "API | User Transaction | Details", `${error.message}`, req);
        sendError(error, "API | User Transaction | Details",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};