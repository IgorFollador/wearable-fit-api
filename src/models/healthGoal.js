'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HealthGoal.belongsTo(models.User, {
        foreignKey: 'professionalUserId'
      });
      HealthGoal.belongsTo(models.User, {
        foreignKey: 'clientUserId'
      });
    }
  }
  HealthGoal.init({
    basalMetabolicRate: DataTypes.INTEGER,
    calorieGoal: DataTypes.INTEGER,
    sleepTime: DataTypes.INTEGER,
    stepGoal: DataTypes.INTEGER,
    physicalActivityTimeGoal: DataTypes.INTEGER,
    sleepTime: DataTypes.INTEGER,
    carbohydrate: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    fat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HealthGoal',
    paranoid: true,
  });
  return HealthGoal;
};