'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthGoals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'Users', 
          key: 'id' 
        }
      },
      professionalUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'Users', 
          key: 'id' 
        }
      },
      basalMetabolicRate: {
        type: Sequelize.INTEGER
      },
      calorieGoal: {
        type: Sequelize.INTEGER
      },
      stepGoal: {
        type: Sequelize.INTEGER
      },
      physicalActivityTimeGoal: {
        type: Sequelize.INTEGER
      },
      sleepTime: {
        type: Sequelize.INTEGER
      },
      carbohydrate: {
        type: Sequelize.INTEGER
      },
      protein:{
        type: Sequelize.INTEGER
      },
      fat:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HealthGoals');
  }
};