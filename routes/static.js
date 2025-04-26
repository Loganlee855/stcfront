const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../views/assets");
const authController = require("../controllers/app/auth");
const agentController = require("../controllers/app/agent");
const userController = require("../controllers/app/user");
const noticeController = require("../controllers/app/notice");
const restController = require("../controllers/app/rest");
const providerController = require("../controllers/app/provider");
const checkRole = require("../middlewares/roleMiddleware");
const checkType = require("../middlewares/agentMiddleware");

router.get("/dashboard.js", restController.dashboardjs);

router.get("/agent.js",checkType([3]), agentController.agentsjs);
router.get("/agent_exchange_history.js", agentController.agentExchangeHistoryjs);
router.get("/agent_balance_history.js", agentController.agentBalanceHistoryjs);
router.get("/agent_action_history.js", agentController.agentActionHistoryjs);

router.get(`/profile.js`, (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.render("assets/profile", {
    session: req.session,
  });
});

router.get(`/global.js`, (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.render(`assets/global`, {
    __: typeof req.__ === "function" ? req.__.bind(req) : (key) => key,
  });
});

module.exports = router;
