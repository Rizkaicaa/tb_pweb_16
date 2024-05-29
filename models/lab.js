'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lab extends Model {
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
        let lastIdNumber = 0;
        if (lastLab && typeof lastLab.id === 'string' && lastLab.id.includes('-')) {
          const idParts = lastLab.id.split('-');
          lastIdNumber = parseInt(idParts[1], 10) || 0;
        }
        const newId = `L-${String(lastIdNumber + 1).padStart(2, '0')}`;
        lab.id = newId;
      }
    }
  });

  return Lab;
};
