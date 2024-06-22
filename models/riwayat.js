'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Riwayat extends Model {
    static associate(models) {
      Riwayat.belongsTo(models.Dataaset, {
        foreignKey: 'id_aset',
        as: 'aset',
      });
    }
  }

  Riwayat.init({
    id_aset: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Dataasets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    nama_aset: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tindakan: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Riwayat'
  });

  return Riwayat;
};
