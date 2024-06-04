'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'jenis_lab');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'jenis_lab', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
