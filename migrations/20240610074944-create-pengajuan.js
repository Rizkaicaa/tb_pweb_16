'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pengajuans', {
      id_pengajuan: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nama_aset: {
        type: Sequelize.STRING,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
      harga: {
        type: Sequelize.FLOAT,
      },
      total_harga: {
        type: Sequelize.FLOAT,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      id_lab: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Labs',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pengajuans');
  }
};
