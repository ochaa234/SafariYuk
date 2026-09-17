'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      // Many to Many lewat tabel TicketCategories
      Ticket.belongsToMany(models.Category, { through: models.TicketCategory });
      Ticket.hasMany(models.Booking);
    }

    // Static method: ambil semua paket + kategorinya, bisa search dan sort
    static getTickets(search, sort) {
      const options = {
        include: sequelize.models.Category,
        order: [['name', 'ASC']]
      };

      if (search) {
        options.where = { name: { [Op.iLike]: `%${search}%` } };
      }

      if (sort === 'za') {
        options.order = [['name', 'DESC']];
      }

      return Ticket.findAll(options);
    }

    // Instance method: potong deskripsi yang panjang
    shortDescription() {
      if (this.description.length > 100) {
        return this.description.slice(0, 100) + '...';
      }
      return this.description;
    }

    // Getter: maskot hewan untuk tiap paket (dipakai di tampilan)
    get animal() {
      const animals = ['giraffe', 'elephant', 'lion', 'monkey'];
      return animals[(this.id - 1) % animals.length];
    }
  }

  Ticket.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama paket wajib diisi' },
        notEmpty: { msg: 'Nama paket wajib diisi' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Deskripsi wajib diisi' },
        notEmpty: { msg: 'Deskripsi wajib diisi' },
        len: { args: [20], msg: 'Deskripsi minimal 20 karakter' }
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket'
  });

  return Ticket;
};
