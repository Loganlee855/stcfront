module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            agentCode: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "agent code",
            },
            userCode: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "user code",
            },
            balance: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "slot balance",
            },
            aasUserCode: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "User ID sent from hpplaycasion (Evol uses this ID, including for recharging user money)",
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                comment: "1: standard, 2: deleted",
            },
            parentPath: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "parent path",
            },
            totalDebit: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: false,
                defaultValue: 0,
                comment: "total bet money",
            },
            totalCredit: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: false,
                defaultValue: 0,
                comment: "total win money",
            },
        },
        {
            tableName: "users",
            timestamps: true,
        }
    );

    return User;
};
