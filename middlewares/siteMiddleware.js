const { Checkup } = require("../models");

module.exports = function checkSite() {
  return async function(req, res, next) {
    const user = req.session.auth;
    
    try {
      const general = await Checkup.findOne({ where: { status: 0 } });
      console.log(general);
      if (general && user.role != 0) {
        return res.render("rest/503", {
          setting: general,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).send('Internal Server Error');
    }
    next();
  };
};
