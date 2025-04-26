module.exports = (sequelize, Sequelize) => {
    const ProviderList = sequelize.define(
        "ProviderList",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            provider: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provider_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provider_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provider_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            product_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            product_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            game_type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            game_type_c: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            }
        }, {
            tableName: 'provider_lists',
            timestamps: true
        }
    );

    return ProviderList;
};
