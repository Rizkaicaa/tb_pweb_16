"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pengadaan extends Model {
    static associate(models) {
      Pengadaan.belongsTo(models.Pengajuan, {
        foreignKey: "id_pengajuan",
        as: "pengajuan",
      });
    }
  }

  Pengadaan.init(
    {
      id_pengajuan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pengajuan",
          key: "id_pengajuan",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        unique: true,  // Ensure one-to-one relationship
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nama_aset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      harga_beli: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bukti: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pengadaan",
      timestamps: true
    }
  );

  return Pengadaan;
};
