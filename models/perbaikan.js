"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Perbaikan extends Model {
    static associate(models) {
      // Define association here
      Perbaikan.belongsTo(models.Dataaset, {
        foreignKey: "id_aset",
        as: "aset",
      });
    }
  }
  Perbaikan.init(
    {
      id_aset: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Dataasets",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nama_aset: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jadwal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Perbaikan",
    }
  );
  return Perbaikan;
};
