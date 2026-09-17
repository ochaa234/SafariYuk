'use strict';
/** @type {import('sequelize-cli').Migration} */
// Migration tambahan: ADD CONSTRAINT
// Memastikan tidak ada dua booking dengan kode e-ticket yang sama
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('Bookings', {
      fields: ['bookingCode'],
      type: 'unique',
      name: 'unique_booking_code'
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint('Bookings', 'unique_booking_code');
  }
};
