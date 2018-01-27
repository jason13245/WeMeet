'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dates', [
      {
        date: new Date(2017, 12, 12).getTime()/1000,
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 13).getTime()/1000,
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 14).getTime()/1000,
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 15).getTime()/1000,
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 16).getTime()/1000,
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        date: new Date(2017, 12, 14).getTime()/1000,
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
