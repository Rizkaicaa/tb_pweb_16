const bcrypt = require ('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
        {
          email: 'admin@gmail.com',
          password: await bcrypt.hash('admin', 10),
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
          
        },
        {
          email: 'welly@gmail.com',
          password: await bcrypt.hash('welly', 10),
          role: 'Kepala Lab',
          nama: 'Dwi Welly Sugmanigrat',
          nip: '0987654321',
          jenis_kelamin: 'Female',
          no_hp: '08987654321',
          alamat: 'Padang',
          jenis_lab: 'Laboratory of Business Intelligence',
          tanggal_lahir: '1989-05-15', // Sample date of birth
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'husnil@gmail.com',
          password: await bcrypt.hash('husnil', 10),
          role: 'Kepala Departemen',
          nama: 'Husnil Kamil',
          nip: '1357924680',
          jenis_kelamin: 'male',
          no_hp: '0812312353',
          alamat: 'Padang',
          tanggal_lahir: '1988-10-20', // Sample date of birth
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    

  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Users', null, {});
  }
};
