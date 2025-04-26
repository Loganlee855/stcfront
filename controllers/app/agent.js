exports.agents = async (req, res) => {
    return res.render("agent/agents", {
        session: req.session,
    });
};

exports.agentsjs = async (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    return res.render("assets/agent", {
        session: req.session,
    });
};

exports.agentExchangeHistory = async (req, res) => {
    return res.render("agent/agentExchangeHistory", {
        session: req.session,
    });
};

exports.agentExchangeHistoryjs = async (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    return res.render("assets/agentExchangeHistory", {
        session: req.session,
    });
};

exports.agentBalanceHistory = async (req, res) => {
    return res.render("agent/agentBalanceHistory", {
        session: req.session,
    });
};

exports.agentBalanceHistoryjs = async (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    return res.render("assets/agentBalanceHistory", {
        session: req.session,
    });
};

exports.agentActionHistory = async (req, res) => {
    return res.render("agent/agentActionHistory", {
        session: req.session,
    });
};

exports.agentActionHistoryjs = async (req, res) => {
    return res.render("assets/agentActionHistory", {
        session: req.session,
    });
};