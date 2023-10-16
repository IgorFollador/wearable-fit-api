'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoogleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GoogleUser.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  GoogleUser.init({
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    scope: DataTypes.STRING,
    tokenType: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GoogleUser',
  });
  return GoogleUser;
};