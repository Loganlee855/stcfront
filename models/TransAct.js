module.exports = (sequelize, Sequelize) => {
    const TransAct = sequelize.define(
        "TransAct",
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
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {
            tableName: 'trans_acts',
            timestamps: true
        }
    );

    return TransAct;
};
