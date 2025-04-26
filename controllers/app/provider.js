const { ProviderList } = require("../../models");

exports.provider = async (req, res) => {
    return res.render("provider/providers", {
        session: req.session,
    });
};

exports.gameList = async (req, res) => {

    const provider = await ProviderList.findOne({
        where : {
            provider_code: req.params.provider,
            product_id: req.params.id,
        }
    });

    const referer = req.get('Referer');
    let refererPath = '/';

    if (referer) {
        refererPath = new URL(referer).pathname;
    }

    if (!provider | refererPath !== '/provider') {
        return res.redirect('/provider');
    }
    return res.render("provider/games", {
        session: req.session,
        provider_code: req.params,
    });
};