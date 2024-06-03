'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengajuan extends Model {
    static associate(models) {
      // define association here
    }
  }
  Pengajuan.init({
    id_pembelianaset: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_aset: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    harga: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tujuan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pengajuan',
  });
  return Pengajuan;
};