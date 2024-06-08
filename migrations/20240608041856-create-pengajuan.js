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
      tujuan: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      id_lab: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Labs', // Sesuaikan dengan nama tabel yang akan direferensi
          key: 'id'  // Sesuaikan dengan nama kolom primary key di tabel Labs
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
