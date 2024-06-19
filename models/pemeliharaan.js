'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PemeliharaanAset extends Model {
    static associate(models) {
      PemeliharaanAset.belongsTo(models.Dataaset, {
        foreignKey: 'id_aset',
        as: 'aset',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }

  PemeliharaanAset.init({
    id_pemeliharaan: {
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
    deskripsi: DataTypes.STRING,
    jadwal: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PemeliharaanAset'
  });

  return PemeliharaanAset;
};
