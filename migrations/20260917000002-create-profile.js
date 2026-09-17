'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      fullName: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: false },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // unique = kunci relasi One to One
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Profiles');
  }
};
