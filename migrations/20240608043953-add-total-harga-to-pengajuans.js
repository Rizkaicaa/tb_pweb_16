'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pengajuans', 'total_harga', {
      type: Sequelize.FLOAT,
      after: 'harga' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pengajuans', 'total_harga');
  }
};
