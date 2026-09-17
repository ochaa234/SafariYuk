'use strict';
/** @type {import('sequelize-cli').Migration} */
// Migration tambahan: ADD COLUMN
// bookingCode = kode unik e-ticket yang di-encode ke QR Code (MVP)
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'bookingCode', {
      type: Sequelize.STRING(20)
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Bookings', 'bookingCode');
  }
};
