'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengajuan extends Model {
    static associate(models) {
      Pengajuan.belongsTo(models.Lab, {
        foreignKey: "id_lab",
        as: "lab",
      });
    }
  }
  Pengajuan.init({
    id_pengajuan: {
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tujuan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_lab: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Labs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Pengajuan',
  });
  return Pengajuan;
};