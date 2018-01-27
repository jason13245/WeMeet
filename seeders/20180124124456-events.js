'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('events', [
        {
          createdBy: 1,
          eventName: "ITDog",
          eventType: 'food',
          url: 'itdog',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          createdBy: 1,
          eventName: "ITDog2",
          eventType: 'food',
          url: 'itdog2',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('events', null, {});
    
  }
};
