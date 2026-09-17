'use strict';
const tickets = require('../data/tickets.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = tickets.map((ticket) => ({
      ...ticket,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Tickets', data);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Tickets', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
