'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TicketCategory extends Model {
    static associate(models) {
      TicketCategory.belongsTo(models.Ticket);
      TicketCategory.belongsTo(models.Category);
    }
  }

  TicketCategory.init({
    TicketId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TicketCategory'
  });

  return TicketCategory;
};
