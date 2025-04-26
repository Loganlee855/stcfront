module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define(
        "Setting",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            api_url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            logo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            contact: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        }, {
            tableName: 'settings',
            timestamps: true
        }
    );

    return Setting;
};
