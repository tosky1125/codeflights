'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn(
       'iata',
       'img',
       {
         type: Sequelize.TEXT
       }
     );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('iata', 'img');
  }
};
