module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define(
        "Transaction",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: Sequelize.STRING,
            },
            agentCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            member_account: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            before_balance: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            after_balance: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
            },
            member_account: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            action: {
                type: Sequelize.STRING,
            },
            amount: {
                type: Sequelize.FLOAT,
            },
            currency: {
                type: Sequelize.STRING,
            },
            valid_bet_amount: {
                type: Sequelize.FLOAT,
            },
            bet_amount: {
                type: Sequelize.FLOAT,
            },
            prize_amount: {
                type: Sequelize.FLOAT,
            },
            tip_amount: {
                type: Sequelize.FLOAT,
            },
            wager_code: {
                type: Sequelize.STRING,
            },
            wager_status: {
                type: Sequelize.STRING,
            },
            round_id: {
                type: Sequelize.STRING,
            },
            payload: {
                type: Sequelize.TEXT,
            },
            settled_at: {
                type: Sequelize.DATE,
            },
            product_code: {
                type: Sequelize.STRING,
            },
            game_code: {
                type: Sequelize.STRING,
            },
            game_type: {
                type: Sequelize.STRING,
            },
            provider_code: {
                type: Sequelize.STRING,
            },
            provider_id: {
                type: Sequelize.STRING,
            },
            game_name: {
                type: Sequelize.STRING,
            },
            provider_line_id: {
                type: Sequelize.STRING,
            },
            povider_product_id: {
                type: Sequelize.STRING,
            },
            povider_product_oid: {
                type: Sequelize.STRING,
            }
        }, {
            tableName: 'transactions',
            timestamps: true
        }
    );

    return Transaction;
};
