const express = require("express");

const router = express.Router();

// controllers
const authController = require("../controllers/app/auth");
const agentController = require("../controllers/app/agent");
const userController = require("../controllers/app/user");
const noticeController = require("../controllers/app/notice");
const restController = require("../controllers/app/rest");
const providerController = require("../controllers/app/provider");
const checkRole = require('../middlewares/roleMiddleware');
const checkType = require('../middlewares/agentMiddleware');
const checkSite = require('../middlewares/siteMiddleware');

router.get("/", authController.login);
// rest routes
router.get("/dashboard",checkSite(), restController.dashboard);
router.get("/docs",checkSite(), restController.docs);
router.get("/404",checkSite(), restController.notFound);
router.get("/profile",checkSite(), restController.profile);

// agents routes
router.get("/agent/manage",checkSite(),checkType([3]), agentController.agents);
router.get("/agent/exchange_history",checkSite(),checkSite(), agentController.agentExchangeHistory);
router.get("/agent/balance_history",checkSite(),checkSite(), agentController.agentBalanceHistory);
router.get("/agent/action_history",checkSite(),checkRole([1]), agentController.agentActionHistory);

// users routes
router.get("/user/manage",checkSite(), userController.users);
router.get("/user/exchange_history",checkSite(), userController.userExchangeHistory);
router.get("/user/balance_history",checkSite(), userController.userBalanceHistory);
router.get("/user/game_transaction",checkSite(), userController.slotGameTransaction);

// transaction routes
router.get("/live_game_transaction",checkSite(), userController.liveGameTransaction);


// provider routes
router.get("/provider",checkSite(), providerController.provider);
router.get("/provider/:provider/games_list/:id",checkSite(), providerController.gameList);

// notice routes
router.get("/message",checkSite(), noticeController.message);
router.get("/checkup",checkSite(), checkRole([1]),noticeController.checkup);
router.get("/popup",checkSite(), checkRole([1]),noticeController.popup);

// 404
router.get("/*", restController.notFound);

module.exports = router;
