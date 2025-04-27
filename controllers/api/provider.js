const { Op } = require("sequelize");
const { Provider,ProviderList,GameList,Agent,User } = require("../../models");
const logger = require("../../utils/logger");
const { ERR_MSG } = require("../../utils/constants");
const { requestForCheck } = require("../../utils/request");
const { dot, det } = require("../../utils/common");
const axios = require("axios");
const MD5 = require("md5.js");
const qs = require('qs');
const config = require("../../config/main");
const { sendError } = require("../../utils/telegram");

exports.createProvider = async (req, res) => {
    try {
        const { providerCode, providerName, providerEndpoint, providerType } = req.body;

        await Provider.create({
            code: providerCode,
            name: providerName,
            endpoint: providerEndpoint,
            type: providerType
        });

        return res.json({ status: 1 });
    } catch (error) {
        logger("error", "API | Provider | Create", `${error.message}`, req);
        sendError(error, "API | Provider | Create",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.updateProvider = async (req, res) => {
    try {
        const { providerCode, providerName, providerEndpoint, providerType } = req.body;
        const { id } = req.params;

        const provider = await Provider.findByPk(id);
        if (!provider) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PROVIDER,
            });
        }

        await provider.update({
            code: providerCode,
            name: providerName,
            endpoint: providerEndpoint,
            type: providerType
        });

        return res.json({ status: 1 });
    } catch (error) {
        logger("error", "API | Provider | Update", `${error.message}`, req);
        sendError(error, "API | AuthProvider | Update",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.setStatusProvider = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const provider = await ProviderList.findByPk(id);
        if (!provider) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PROVIDER,
            });
        }

        await provider.update({
            status: status,
        });

        return res.json({ status: 1 });
    } catch (error) {
        logger("error", "API | Provider | Set Status", `${error.message}`, req);
        sendError(error, "API | Provider | Set Status",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.deleteProvider = async (req, res) => {
    try {
        await Provider.destroy({ where: { id: req.params.id } });

        return res.json({ status: 1 });
    } catch (error) {
        logger("error", "API | Provider | Delete", `${error.message}`, req);
        sendError(error, "API | Provider | Delete",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);

        if (!provider) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PROVIDER,
            });
        }

        return res.json({
            status: 1,
            data: provider,
        });
    } catch (error) {
        logger("error", "API | Provider | Get By ID", `${error.message}`, req);
        sendError(error, "API | Provider | Get By ID",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getAllProviders = async (req, res) => {
    try {
        const { start, search, draw, length, order, dir } = req.query;

        let query = {
            [Op.or]: [{ id: { [Op.substring]: search } }, { provider_name: { [Op.substring]: search } }],
        };

        const result = await ProviderList.findAndCountAll({
            where: query,
            offset: Number(start),
            limit: Number(length),
            order: [[order, dir]],
        });

        return res.json({
            status: 1,
            data: result.rows,
            draw: Number(draw),
            start: Number(start),
            recordsTotal: result.count,
            recordsFiltered: result.count,
        });
    } catch (error) {
        logger("error", "API | Provider | Get All", `${error.message}`, req);
        sendError(error, "API | Provider | Get All",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getProviderList = async (req, res) => {
    try {
        const data = await ProviderList.findAll({
          attributes: ["provider", "provider_code","game_type", "status"],
          order: [
            ["game_type_c", "ASC"],
            ["status", "DESC"],
          ],
        });

        const encData = dot(data);

        return res.json({
            status: 1,
            result: {
                encData
            },
        });
    } catch (error) {
        logger("error", "API | Provider | Get All", `${error.message}`, req);
        sendError(error, "API | Provider | Get All",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getGamesList = async (req, res) => {
    try {
        const data = await GameList.findAll({
          where: { provider_code: req.params.provider },
          attributes: ["provider", "provider_code","game_name","game_code","game_type", "status"],
          order: [
            ["status", "DESC"],
          ],
        });

        const encData = dot(data);

        return res.json({
            status: 1,
            result: {
                encData
            },
        });
    } catch (error) {
        logger("error", "API | Provider | Get All", `${error.message}`, req);
        sendError(error, "API | Provider | Get All",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getAllGames = async (req, res) => {
    try {
        const { start, search, draw, length, order, dir } = req.query;

        let query = {
            [Op.or]: [{ id: { [Op.substring]: search } }, { game_name: { [Op.substring]: search } }],
        };

        if (req.params.provider) {
            query.provider_code = req.params.provider;
            query.product_id = req.params.id;
        }

        const result = await GameList.findAndCountAll({
            where: query,
            offset: Number(start),
            limit: Number(length),
            order: [[order, dir]],
        });

        return res.json({
            status: 1,
            data: result.rows,
            draw: Number(draw),
            start: Number(start),
            recordsTotal: result.count,
            recordsFiltered: result.count,
        });
    } catch (error) {
        logger("error", "API | Provider | Get All", `${error.message}`, req);
        sendError(error, "API | Provider | Get All",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.checkProvider = async (req, res) => {
    try {
        const { providerCode,gameType } = req.query;

        if (providerCode == "all") {
            let result = [];

            const providers = await ProviderList.findAll();

            for (const provider of providers) {
                const checkResult = await requestForCheck(provider.provider_code,provider.game_type);
                result.push({
                    code: provider.provider_code,
                    game_type: provider.game_type,
                    ...checkResult,
                });
            }

            return res.json({
                status: 1,
                result,
            });
        } else {
            const provider = await ProviderList.findOne({ where: { provider_code: providerCode , game_type: gameType } });

            if (!provider) {
                return res.json({
                    status: 0,
                    msg: ERR_MSG.INVALID_PROVIDER,
                });
            }

            const result = await requestForCheck(provider.provider_code,provider.game_type);

            return res.json({
                status: 1,
                result,
            });
        }
    } catch (error) {
        logger("error", "API | Provider | Check", `${error.message}`, req);
        sendError(error, "API | Provider | Check",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.getGamesById = async (req, res) => {
    try {
        const data = await GameList.findByPk(req.params.id);

        if (!data) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PROVIDER,
            });
        }

        const encData = dot(data);

        return res.json({
            status: 1,
            result: {
                encData
            },
        });
    } catch (error) {
        logger("error", "API | Provider | Get By ID", `${error.message}`, req);
        sendError(error, "API | Provider | Get By ID",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.updategame = async (req, res) => {
    try {
        const { game_image } = req.body;
        const { id } = req.params;

        const provider = await GameList.findByPk(id);
        if (!provider) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PROVIDER,
            });
        }

        await provider.update({
            game_image: game_image,
        });

        return res.json({ status: 1 });
    } catch (error) {
        logger("error", "API | Provider | Update", `${error.message}`, req);
        sendError(error, "API | Provider | Update",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.launchGame = async (req, res) => {
    try {
        const data = await GameList.findByPk(req.body.id);

        if (!data) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PROVIDER,
            });
        }

        const existAgent = await Agent.findOne({ where: { uuid: req.body.agent } });

        if (!existAgent) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_PARENT_AGENT,
            });
        }

        const users = await User.findOne({ where: { agentCode: existAgent.agentCode } });

        if (!users) {
            return res.json({
                status: 0,
                msg: 'Player not found',
            });
        }

        const sechash = {
            secureLogin: existAgent.secureLogin,
            externalPlayerId: users.aasUserCode,
            provider_code: data.provider_code,
            game_code: data.game_code,
            platform: 'WEB',
            language: 0,
            lobbyURL: 'https://google.com',
            secretKey: existAgent.secretkey,
        };

        const hash = new MD5().update(new URLSearchParams(sechash).toString()).digest("hex");

        const params = {
            secureLogin: existAgent.secureLogin,
            externalPlayerId: users.aasUserCode,
            provider_code: data.provider_code,
            game_code: data.game_code,
            platform: 'WEB',
            language: 0,
            lobbyURL: 'https://google.com',
            hash: hash,
        };

        const encodedData = new URLSearchParams(params).toString();

        const url = config.aasEndpoint + 'IntegrationService/http/api/games/GameLaunch';

        const response = await axios.post(url, encodedData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.data.error == 0) {
            return res.json({
                status: 1,
                gameUrl: response.data.gameURL,
            });
        } else {
            return res.json({
                status: 0,
                msg: response.data.description,
            });
        }
    } catch (error) {
        logger("error", "API | Provider | Launch Game", `${error.message}`, req);
        sendError(error, "API | Provider | Launch Game",req.originalUrl);
        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};