'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pengadaans', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_pengajuan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, 
        references: {
          model: 'Pengajuans', 
          key: 'id_pengajuan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nama_aset: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      harga_beli: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bukti: {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pengadaans');
  }
};
