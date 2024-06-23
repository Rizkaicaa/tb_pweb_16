const bcrypt = require ('bcrypt');
("use strict");

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
          email: 'husnil@gmail.com',
          password: await bcrypt.hash('husnil', 10),
          role: 'Kepala Departemen',
          nama: 'Husnil Kamil',
          nip: '1357924680',
          jenis_kelamin: 'Laki-Laki',
          no_hp: '0812312353',
          alamat: 'Padang',
          tanggal_lahir: '1988-10-20', 
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    

  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Users', null, {});
  }
};
