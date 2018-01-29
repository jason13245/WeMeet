'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('votePlaces', 'placesId', 'placeId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('votePlaces', 'placeId', 'placesId');
  }
};