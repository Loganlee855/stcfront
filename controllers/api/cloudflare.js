const logger = require("../../utils/logger");
const axios = require("axios");
const { Agent,Cloudflare } = require("../../models");
const { ERR_MSG } = require("../../utils/constants");
const isEmpty = require("../../utils/isEmpty");
const config = require("../../config/main");
const API_TOKEN = config.CF_API_TOKEN;
const CLOUDFLARE_API_URL = `${config.CF_API_URL}/firewall/rules`;
const { sendError } = require("../../utils/telegram");

exports.getFirewallRules = async (req, res) => {
  try {
    const response = await axios.get(CLOUDFLARE_API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return res.json({
        status: 1,
        result: response.data.result,
    });
  } catch (error) {
    logger("error", "API | Cloudflare | Get Firewal rules", `${error.message}`, req);
    sendError(error, "API | Cloudflare | Get Firewal rules",req.originalUrl);
    return res.json({
      status: 0,
      msg: ERR_MSG.INTERNAL_ERROR,
    });
  }
};

exports.createWhitelistRule = async (req, res) => {
  try {
    const { ipAddress,agentCode } = req.body;
    const ruleData = {
      action: 'allow',
      filter: {
        expression: `ip.src eq ${ipAddress}`,
        paused: false
      },
      description: `${agentCode}`,
    };
    const response = await axios.post(CLOUDFLARE_API_URL,ruleData, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return res.json({
        status: 1,
        result: response.data,
    });
  } catch (error) {
    logger("error", "API | Cloudflare | Create whitelist", `${error.message}`, req);
    sendError(error, "API | Cloudflare | Create whitelist",req.originalUrl);
    return res.json({
      status: 0,
      msg: ERR_MSG.INTERNAL_ERROR,
    });
  }
};

exports.deleteFirewallRule = async (req, res) => {
  try {
    const { ruleId } = req.body;
    const response = await axios.delete(`${CLOUDFLARE_API_URL}/${ruleId}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return res.json({
        status: 1,
        result: response.data,
    });
  } catch (error) {
    logger("error", "API | Cloudflare | Delete whitelist", `${error.message}`, req);
    sendError(error, "API | Cloudflare | Delete whitelist",req.originalUrl);
    return res.json({
      status: 0,
      msg: ERR_MSG.INTERNAL_ERROR,
    });
  }
};