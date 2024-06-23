'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Lab, {
        foreignKey: 'id_user',
        as: 'lab'
      });
    }
  }
  User.init({
    email: { 
      type: DataTypes.STRING,
      unique: true 
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    jenis_kelamin: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};