'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn(
       'flights',
       'logo',
       {
         type: Sequelize.TEXT
       }
     );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('flgihts', 'img');
  }
};
