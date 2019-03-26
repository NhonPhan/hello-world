module.exports = function(sequelize, DataTypes) {
    return sequelize.define('staff', { 
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey : true,
            autoIncrement: true
        },    
        role_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
};
