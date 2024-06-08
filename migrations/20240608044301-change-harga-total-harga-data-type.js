'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pengajuans', 'harga', {
      type: Sequelize.INTEGER
    });

    await queryInterface.changeColumn('Pengajuans', 'total_harga', {
      type: Sequelize.INTEGER
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pengajuans', 'harga', {
      type: Sequelize.FLOAT
    });

    await queryInterface.changeColumn('Pengajuans', 'total_harga', {
      type: Sequelize.FLOAT
    });
  }
};
