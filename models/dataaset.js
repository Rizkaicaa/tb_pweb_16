"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dataaset extends Model {
    static associate(models) {
      // Define association here
      Dataaset.belongsTo(models.Lab, {
        foreignKey: "id_lab",
        as: "lab",
      });
    }
  }
  Dataaset.init(
    {
      id_lab: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Labs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nama_aset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_aset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spesifikasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Dataaset",
    }
  );
  return Dataaset;
};
