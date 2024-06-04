'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Labs', 'id_user', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the target model
        key: 'id' // Key in the target model
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Labs', 'id_user');
  }
};
