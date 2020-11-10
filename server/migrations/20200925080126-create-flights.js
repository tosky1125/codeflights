'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portName: {
        type: Sequelize.STRING
      },
      portCode: {
        type: Sequelize.STRING
      },
      airName: {
        type: Sequelize.STRING
      },
      airID: {
        type: Sequelize.STRING
      },
      estTime: {
        type: Sequelize.STRING
      },
      schTime: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('flights');
  }
};