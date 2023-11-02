'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Igor',
        lastName: 'Follador',
        email: 'igorledf@gmail.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date("2002-10-23"),
        isProfessional: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Profissional',
        lastName: 'Nutricionista',
        email: 'nutri@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        isProfessional: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
