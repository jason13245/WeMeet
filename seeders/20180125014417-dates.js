'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dates', [
      {
        date: new Date(2017, 12, 12).getTime(),
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 13).getTime(),
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 14).getTime(),
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 15).getTime(),
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 16).getTime(),
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 14).getTime(),
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('dates', null, {});

  }
};
