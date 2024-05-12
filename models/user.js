'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: { 
      type: DataTypes.STRING,
      unique: true // Making email attribute unique
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    jenis_kelamin: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    jenis_lab: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};