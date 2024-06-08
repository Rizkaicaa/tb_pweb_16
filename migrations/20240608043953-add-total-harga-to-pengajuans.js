'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pengajuans', 'total_harga', {
      type: Sequelize.FLOAT,
      after: 'harga' // Note: The 'after' option is supported in MySQL but not in all dialects
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pengajuans', 'total_harga');
  }
};
