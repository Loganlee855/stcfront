module.exports = (sequelize, Sequelize) => {
    const ApiCredential = sequelize.define(
        "ApiCredential",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            apikey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            secretkey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            tableName: 'api_credentials',
            timestamps: true
        }
    );

    return ApiCredential;
};
