const express = require("express");
const router = express.Router();

// controllers
const authController = require("../controllers/api/auth");
const agentController = require("../controllers/api/agent");
const agentBalanceProgressController = require("../controllers/api/agentBalanceProgress");
const agentActivityHistoryController = require("../controllers/api/agentActivityHistory");
const agentTransactionsController = require("../controllers/api/agentTransaction");
const checkupController = require("../controllers/api/checkup");
const gameTransactionController = require("../controllers/api/gameTransaction");
const messageController = require("../controllers/api/message");
const popupController = require("../controllers/api/popup");
const userController = require("../controllers/api/user");
const userBalanceProgressController = require("../controllers/api/userBalanceProgress");
const userTransactionController = require("../controllers/api/userTransaction");
const realtimeController = require("../controllers/api/realtime");
const cloudflareController = require("../controllers/api/cloudflare");
const providerController = require("../controllers/api/provider");

// middlewares
const validate = require("../middlewares/validate");

// validate schemas
const authSchema = require("../validations/auth");
const agentSchema = require("../validations/agent");
const checkupSchema = require("../validations/checkup");
const messageSchema = require("../validations/message");
const popupSchema = require("../validations/popup");
const userSchema = require("../validations/user");
const callSchema = require("../validations/call");
const providerSchema = require("../validations/provider");

// alive routes
router.get("/alive", (req, res) => {
    return res.json({ status: 1 });
});

// i18n
router.get("/i18n/:locale", (req, res) => {
    req.session.locale = req.params.locale;

    if (req.headers.referer) {
        res.redirect(req.headers.referer);
    } else {
        res.redirect("/");
    }
});

// auth routes
router.post("/auth/login", validate(authSchema.login), authController.login);
router.post("/auth/logout", authController.logout);

// agent routes
router.post("/agent/exchange", validate(agentSchema.exchange), agentController.exchangeAgent);
router.get("/agent/parent/:uuid", agentController.getParentAgents);
router.post("/agent/:uuid/child", agentController.getChildAgents);
router.post("/agent/check", validate(agentSchema.checkCode), agentController.checkAgentCode);
router.put("/agent/profile", validate(agentSchema.profile), agentController.updateProfile);
router.put("/agent/rtp", validate(agentSchema.changeRtp), agentController.changeRtp);
router.post("/agent/tree", agentController.getAgentsByTree);
router.get("/agent/depth", agentController.getChildMaxDepth);
router.post("/agent/create", validate(agentSchema.create), agentController.createAgent);
router.put("/agent/:uuid", validate(agentSchema.update), agentController.updateAgent);
router.put("/agent/:uuid/change_password/",validate(agentSchema.updatePass), agentController.updateAgentPasword);
router.post("/agent/:uuid/details", agentController.getAgentById);
router.delete("/agent/:uuid", agentController.deleteAgent);
router.get("/agent/i18n/:locale", agentController.changeLanguage);

// currency
router.post("/currency", agentController.getCurrencies);

// agent balance progress routes
router.post("/agent_balance_progress", agentBalanceProgressController.getAllProgresses);

router.post("/agent_activity_history", agentActivityHistoryController.getAllActivity);
router.post("/agent_activity_history/:ip", agentActivityHistoryController.getActivitydetails);

// agent transaction routes
router.post("/agent_transaction", agentTransactionsController.getAllTransactions);
router.get("/agent_transaction/type", agentTransactionsController.getTransactionByType);
router.get("/agent_transaction/:id", agentTransactionsController.getTransactionsByAgent);

// checkup routes
router.post("/checkup", validate(checkupSchema.create), checkupController.createCheckup);
router.put("/checkup/:id", checkupController.releaseCheckup);
router.get("/checkup", checkupController.getAllCheckups);
router.delete("/checkup/:id", checkupController.deleteCheckup);

// game transaction routes
router.post("/game_transaction", gameTransactionController.getAllGameTransactions);

// provider routes
router.get("/provider", providerController.getAllProviders);
router.post("/provider/list", providerController.getProviderList);
router.get("/provider/:provider/gameList/:id", providerController.getAllGames);
router.post("/provider/:provider/list/games", providerController.getGamesList);
router.get("/provider/check", providerController.checkProvider);
router.get("/provider/:id", providerController.getProviderById);
router.post("/provider/:id/game_list", providerController.getGamesById);
router.post("/provider/start_game", providerController.launchGame);
router.post("/provider", validate(providerSchema.create), providerController.createProvider);
router.put("/provider/:id", validate(providerSchema.update), providerController.updateProvider);
router.put("/provider/:id/game", validate(providerSchema.updateg), providerController.updategame);
router.put("/provider/status/:id", validate(providerSchema.setStatus), providerController.setStatusProvider);
router.delete("/provider/:id", providerController.deleteProvider);

// message routes
router.post("/message", validate(messageSchema.create), messageController.createMessage);
router.put("/message/:id", validate(messageSchema.answer), messageController.answerMessage);
router.delete("/message/:id", messageController.deleteMessage);
router.get("/message/:id", messageController.getMessageById);
router.get("/message", messageController.getAllMessages);

// popup routes
router.post("/popup", validate(popupSchema.create), popupController.createPopup);
router.put("/popup/:id", popupController.releasePopup);
router.delete("/popup/:id", popupController.deletePopup);
router.get("/popup", popupController.getAllPopups);

// user routes
router.post("/user/all", userController.getAllUsersForDT);
router.post("/user/all/list", userController.getAllUsers);
router.post("/user/:code/agent", userController.getUsersByAgent);
router.put("/user/:code", validate(userSchema.update), userController.updateAgentUser);
router.get("/user/:id", userController.getUserById);
router.post("/user/rtp", validate(userSchema.changeRtp), userController.changeRtp);
router.post("/user/exchange", validate(userSchema.exchange), userController.exchangeUser);

// user balance progress routes
router.get("/user_balance_progress", userBalanceProgressController.getAllProgresses);

// user transaction routes
router.post("/user_transaction/all", userTransactionController.getAllTransactions);
router.post("/user_transaction/:code/agent", userTransactionController.getTransactionsByAgent);

// realtime routes
router.post("/get_balance", realtimeController.getRealTimeInfo);

// cloudflare
router.post("/cloudflare/whitelist", cloudflareController.getFirewallRules);
router.post("/cloudflare/whitelist/create", cloudflareController.createWhitelistRule);
router.post("/cloudflare/whitelist/delete", cloudflareController.deleteFirewallRule);

module.exports = router;
