'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile);   // One to One
      User.hasMany(models.Booking);  // One to Many
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email sudah terdaftar' },
      validate: {
        notNull: { msg: 'Email wajib diisi' },
        notEmpty: { msg: 'Email wajib diisi' },
        isEmail: { msg: 'Format email tidak valid' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password wajib diisi' },
        notEmpty: { msg: 'Password wajib diisi' },
        len: { args: [8], msg: 'Password minimal 8 karakter' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: { args: [['admin', 'customer']], msg: 'Role harus admin atau customer' }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
