module.exports = (sequelize, Sequelize) => {
    const AgentLoginHistory = sequelize.define(
        "AgentLoginHistory",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            agentCode: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
            },
            agentName: Sequelize.STRING,
            action: Sequelize.STRING,
            description: Sequelize.TEXT,
            ip: Sequelize.STRING,
            continent: Sequelize.STRING,
            continentCode: Sequelize.STRING,
            country: Sequelize.STRING,
            countryCode: Sequelize.STRING,
            region: Sequelize.STRING,
            regionName: Sequelize.STRING,
            city: Sequelize.STRING,
            district: Sequelize.STRING,
            zip: Sequelize.STRING,
            lat: Sequelize.STRING,
            lon: Sequelize.STRING,
            timezone: Sequelize.STRING,
            offset: Sequelize.STRING,
            currency: Sequelize.STRING,
            isp: Sequelize.STRING,
            org: Sequelize.STRING,
            as: Sequelize.STRING,
            asname: Sequelize.STRING,
            reverse: Sequelize.STRING,
            mobile: Sequelize.STRING,
            proxy: Sequelize.STRING,
            hosting: Sequelize.STRING,
            query: Sequelize.STRING
        },
        {
            tableName: "agent_login_histories",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return AgentLoginHistory;
};
