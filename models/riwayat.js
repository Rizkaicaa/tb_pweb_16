'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Riwayat extends Model {
    static associate(models) {
      Riwayat.belongsTo(models.Dataaset, {
        foreignKey: 'id_aset',
        as: 'aset',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }

  Riwayat.init({
    id_riwayat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_aset: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
