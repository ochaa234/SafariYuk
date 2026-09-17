'use strict';
const users = require('../data/users.json');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = users.map((user) => ({
      email: user.email,
      password: hashPassword(user.password),
      role: user.role,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Users', data);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
