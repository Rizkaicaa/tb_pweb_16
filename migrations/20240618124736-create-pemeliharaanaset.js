'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PemeliharaanAsets', {
      id_pemeliharaan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_aset: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Dataasets', 
          key: 'id'           
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      jadwal: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PemeliharaanAsets');
  }
};
