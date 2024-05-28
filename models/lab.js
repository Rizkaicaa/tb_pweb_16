'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed
    }
  }

  Lab.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_lab: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_kepala: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_kordas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jumlah_aslab: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lab',
    hooks: {
      beforeCreate: async (lab, options) => {
        const lastLab = await Lab.findOne({
          order: [['createdAt', 'DESC']]
        });
        const lastId = lastLab ? parseInt(lastLab.id.split('-')[1], 10) : 0;
        const newId = `L-${String(lastId + 1).padStart(2, '0')}`;
        lab.id = newId;
      }
    }
  });

  return Lab;
};
