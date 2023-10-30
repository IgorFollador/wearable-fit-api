'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fromUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'Users', 
          key: 'id' 
        }
      },
      toUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'Users', 
          key: 'id' 
        }
      },
      title: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      wasRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};