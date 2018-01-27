'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('places', 'eventName', 'placeName');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('places', 'placeName', 'eventName');
  }
};
