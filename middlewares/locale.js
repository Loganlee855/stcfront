const { Agent, Setting } = require("../models");
const logger = require("../utils/logger");
const { ERR_MSG } = require("../utils/constants");

const setLocale = async (req, res, next) => {
    try {
        // const general = await Setting.findByPk(1);
        // if (general.status != 1) {
        //     return res.render("rest/503");
        // }
        next();
    } catch (error) {
        logger("error", "I18n", error.message, req);

        return res.json({
            status: 0,
            msg: ERR_MSG.INTERNAL_ERROR,
        });
    }
};

module.exports = setLocale;
