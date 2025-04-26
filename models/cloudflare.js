module.exports = (sequelize, Sequelize) => {
    const Cloudflare = sequelize.define(
        "Cloudflare",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            agentCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ruleId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "cloudflare",
            timestamps: true,
        }
    );

    return Cloudflare;
};
