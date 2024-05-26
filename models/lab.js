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
      // define association here
    }
  }
  Lab.init({
    nama_lab: DataTypes.STRING,
    nama_kepala: DataTypes.STRING,
    nama_kordas: DataTypes.STRING,
    jumlah_aslab: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lab',
  });
  return Lab;
};