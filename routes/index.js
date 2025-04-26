const express = require("express");

const router = express.Router();

// routers
const apiRouter = require("./api");
const appRouter = require("./app");
const assRouter = require("./static");

// middlewares
const setLocale = require("../middlewares/locale");
const { Setting } = require("../models");
const { requireApiAuth, requireAppAuth } = require("../middlewares/auth");

router.use("/api", requireApiAuth, apiRouter);
router.use("/js", [requireAppAuth, setLocale], assRouter);
router.use("/", [requireAppAuth, setLocale], appRouter);

router.use((req, res, next) => {
  const general = Setting.findByPk(1);
  if (general.status == 0) {
    return res.render("rest/404");
  }
});

module.exports = router;
