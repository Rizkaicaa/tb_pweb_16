'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dataasets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_lab: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Labs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nama_aset: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_aset: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spesifikasi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Dataasets');
  }
};