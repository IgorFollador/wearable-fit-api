'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Igor',
        lastName: 'Follador',
        email: 'igorledf@gmail.com',
        password: '$2b$10$eNxA6yHhxGtQC.q6rwsY5.iRFWEt8ur6O1f4/XS4nyNlKkku9.Kpq',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
