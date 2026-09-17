'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User);
    }
  }

  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama lengkap wajib diisi' },
        notEmpty: { msg: 'Nama lengkap wajib diisi' }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nomor HP wajib diisi' },
        notEmpty: { msg: 'Nomor HP wajib diisi' },
        isNumeric: { msg: 'Nomor HP hanya boleh berisi angka' }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile'
  });

  return Profile;
};
