'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('iata', 'cityCode', {
       type: Sequelize.STRING
     });
     await queryInterface.addColumn('iata', 'timeZone', {
       type: Sequelize.TEXT
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('iata', 'timeZone');
  }
};
