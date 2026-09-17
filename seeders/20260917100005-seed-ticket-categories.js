'use strict';
const ticketCategories = require('../data/ticketCategories.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = ticketCategories.map((item) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('TicketCategories', data);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('TicketCategories', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
