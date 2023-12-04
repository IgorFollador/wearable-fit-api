'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notifications', [
      {
        fromUserId: 1,
        toUserId: 2,
        title: 'Treinos muito rápidos',
        message: 'Aumente seu cuidado para atingir o tempo de treino esperado,',
        wasRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
