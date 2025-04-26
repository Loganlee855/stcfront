module.exports = (sequelize, Sequelize) => {
    const GameList = sequelize.define(
        "GameList",
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
            provider_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            game_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            game_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            game_image: {
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
            support_currency: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            game_type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
        }, {
            tableName: 'game_lists',
            timestamps: true
        }
    );

    return GameList;
};
