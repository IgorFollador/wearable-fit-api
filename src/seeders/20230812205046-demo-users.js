'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Angela',
        lastName: 'Nutricionista',
        email: 'nutri@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        isProfessional: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Igor',
        lastName: 'Follador',
        email: 'igorledf@gmail.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date("2002-10-23"),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Ramon',
        lastName: 'Dino',
        email: 'ramon.dino@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date("2002-10-23"),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Arnold',
        lastName: 'Schwarzenegger',
        email: 'arnold@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1947-07-30'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Ronnie',
        lastName: 'Coleman',
        email: 'ronnie@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1964-05-13'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Dorian',
        lastName: 'Yates',
        email: 'dorian@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1962-04-19'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Phil',
        lastName: 'Heath',
        email: 'phil@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1979-12-18'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Flex',
        lastName: 'Wheeler',
        email: 'flex@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1965-08-23'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Cedric',
        lastName: 'McMillan',
        email: 'cedric@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1977-08-17'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Kai',
        lastName: 'Greene',
        email: 'kai@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1975-07-12'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jay',
        lastName: 'Cutler',
        email: 'jay@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1973-08-03'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Brigitte',
        lastName: 'Goudz',
        email: 'brigitte@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'f',
        birthDate: new Date('1980-05-21'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Franco',
        lastName: 'Columbu',
        email: 'franco@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1941-08-07'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Serena',
        lastName: 'Williams',
        email: 'serena@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'f',
        birthDate: new Date('1981-09-26'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'muhammad@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1942-01-17'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Venus',
        lastName: 'Williams',
        email: 'venus@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'f',
        birthDate: new Date('1980-06-17'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Michael',
        lastName: 'Phelps',
        email: 'michael@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1985-06-30'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Ronda',
        lastName: 'Rousey',
        email: 'ronda@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'f',
        birthDate: new Date('1987-02-01'),
        isProfessional: false,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Neymar',
        lastName: 'da Silva Santos Júnior',
        email: 'neymar@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1992-02-05'),
        isProfessional: true,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Gabriel',
        lastName: 'Jesus',
        email: 'gabriel@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1997-04-03'),
        isProfessional: true,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Marta',
        lastName: 'Vieira da Silva',
        email: 'marta@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'f',
        birthDate: new Date('1986-02-19'),
        isProfessional: true,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Thiago',
        lastName: 'Silva',
        email: 'thiago@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'm',
        birthDate: new Date('1984-09-22'),
        isProfessional: true,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Formiga',
        lastName: 'da Silva',
        email: 'formiga@example.com',
        password: '$2b$10$RSNkTyxZk40Adq56QuC6BuMLk7G4Dmo0ywCRDL5NVgzqFMGWMPXTK',
        sex: 'f',
        birthDate: new Date('1978-03-03'),
        isProfessional: true,
        professionalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
