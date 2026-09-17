'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Ticket, { through: models.TicketCategory });
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama kategori wajib diisi' },
        notEmpty: { msg: 'Nama kategori wajib diisi' }
      }
    }
  }, {
    sequelize,
    modelName: 'Category'
  });

  return Category;
};
