module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define(
        "Currency",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "currencies",
            timestamps: true,
        }
    );

    return Currency;
};
