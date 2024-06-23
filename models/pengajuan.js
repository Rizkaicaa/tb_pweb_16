'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengajuan extends Model {
    static associate(models) {
      Pengajuan.belongsTo(models.Lab, {
        foreignKey: 'id_lab',
        as: 'lab'
      });
      Pengajuan.hasOne(models.Pengadaan, {
        foreignKey: 'id_pengajuan',
        as: 'pengadaan'
      });
    }
  }
  Pengajuan.init({
    id_pengajuan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true  
    },
    id_lab: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Labs',
        key: 'id'
      }
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
    }
  }, {
    sequelize,
    modelName: 'Pengajuan',
    timestamps: true
    }
  );
  return Pengajuan;
};
