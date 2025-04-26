const axios = require("axios");
const bcrypt = require('bcrypt');
const { Agent, AgentLoginHistory } = require("../../models");
const { ERR_MSG } = require("../../utils/constants");
const logger = require("../../utils/logger");

exports.login = async (req, res) => {
    try {
        const { agentCode, password } = req.body;

        const agent = await Agent.findOne({
            where: { agentCode },
            include: [
                {
                    model: Agent,
                    as: "parent",
                    attributes: ["agentCode"],
                },
            ],
        });
        if (!agent) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INVALID_AGENT,
            });
        }

        const matchPass = await bcrypt.compare(password, agent.password);

        if (!matchPass) {
            return res.json({
                status: 0,
                msg: ERR_MSG.INCORRECT_PASSWORD,
            });
        }

        if (agent.status == 1) {
            req.session.auth = {
                ...agent.dataValues,
                password: undefined,
                parentCode: agent.parent ? agent.parent.agentCode : "",
            };

            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            let ipRes = {};

            for (let i = 0; i < 10; ++i) {
                ipRes = await axios.get(`http://ip-api.com/json/${ip}?fields=66846719`);
                if (ipRes.status == 200) {
                    break;
                }
            }

            ipRes.data ? 0 : ipRes.data = {};
            AgentLoginHistory.create({
                agentCode,
                agentName: agent.agentName,
                action: "Login",
                description: `Login [${agent.agentName}]`,
                ip,
                continent: ipRes.data.continent || "",
                continentCode: ipRes.data.continentCode || "",
                country: ipRes.data.country || "",
                region: ipRes.data.region || "",
                regionName: ipRes.data.regionName || "",
                city: ipRes.data.city || "",
                district: ipRes.data.district || "",
                zip: ipRes.data.zip || "",
                lat: ipRes.data.lat || "",
                lon: ipRes.data.lon || "",
                timezone: ipRes.data.timezone || "",
                offset: ipRes.data.offset || "",
                currency: ipRes.data.currency || "",
                isp: ipRes.data.isp || "",
                org: ipRes.data.org || "",
                as: ipRes.data.as || "",
                asname: ipRes.data.asname || "",
                reverse: ipRes.data.reverse || "",
                mobile: ipRes.data.mobile || "",
                proxy: ipRes.data.proxy || "",
                hosting: ipRes.data.hosting || "",
                query: ipRes.data.query || ""
            });

            let redirectUrl = "";
            if (agent.role == 100) {
                redirectUrl = "/agents";
            } else {
                redirectUrl = "/dashboard";
            }

            return res.json({
                status: 1,
                redirectUrl,
            });
        } else {
            return res.json({
                status: 0,
                msg: ERR_MSG.BLOCKED_AGENT,
            });
        }
    } catch (error) {
        logger("error", "API | Auth | Login", `${error.message}`, req);

        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy();

        return res.json({ status: 1 });
    } catch (error) {
        logger("error", "API | Auth | Logout", `${error.message}`, req);

        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};
