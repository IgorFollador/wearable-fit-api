'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.GoogleUser);
      User.belongsTo(models.User, {
        as: 'Professional',
        foreignKey: 'professionalId',
        onDelete: 'SET NULL'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    sex: DataTypes.STRING.BINARY,
    birthDate: DataTypes.DATEONLY,
    isProfessional: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};