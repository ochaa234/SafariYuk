'use strict';
const users = require('../data/users.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = users.map((user, index) => ({
      fullName: user.fullName,
      phone: user.phone,
      UserId: index + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Profiles', data);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Profiles', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
