'use strict';
const { Model } = require('sequelize');
const { formatDate, getTodayString, generateBookingCode } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User);
      Booking.belongsTo(models.Ticket);
    }

    // Static method: semua booking milik 1 user, beserta data tiketnya
    static getBookingsByUser(UserId) {
      return Booking.findAll({
        where: { UserId },
        include: sequelize.models.Ticket,
        order: [['visitDate', 'ASC']]
      });
    }

    // Getter
    get formattedVisitDate() {
      return formatDate(this.visitDate);
    }

    get isUpcoming() {
      return this.visitDate >= getTodayString();
    }

    get status() {
      if (this.isUpcoming) return 'Aktif';
      return 'Sudah lewat';
    }
  }

  Booking.init({
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'Tanggal kunjungan wajib diisi' },
        isDate: { args: true, msg: 'Tanggal kunjungan tidak valid' },
        isNotPast(value) {
          if (value < getTodayString()) {
            throw new Error('Tanggal kunjungan tidak boleh sebelum hari ini');
          }
        }
      }
    },
    bookingCode: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TicketId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
    hooks: {
      // Hook: setiap booking baru otomatis dapat kode e-ticket untuk QR Code
      beforeCreate(booking) {
        booking.bookingCode = generateBookingCode();
      }
    }
  });

  return Booking;
};
