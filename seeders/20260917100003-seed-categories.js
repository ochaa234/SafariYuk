'use strict';
const categories = require('../data/categories.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = categories.map((category) => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Categories', data);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
