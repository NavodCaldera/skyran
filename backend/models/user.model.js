module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        first_Name: DataTypes.STRING,
        last_Name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                msg: "Must be a valid email address",
                }
            }
        },
        password: DataTypes.STRING,
        birthday: DataTypes.DATE

    })
    return User;
};