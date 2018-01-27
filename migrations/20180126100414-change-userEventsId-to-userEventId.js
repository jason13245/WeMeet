'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('votePlaces', 'userEventsId', 'userEventId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('votePlaces', 'userEventId', 'userEventsId');
  }
};
