'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', [
      {
        placeName: "KFC",
        yelpId: "kfc",
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        placeName: "Cafe de coral",
        yelpId: "cafe-de-coral",
        eventId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        placeName: "Tam jai",
        yelpId: "tam-jai",
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        placeName: "MEDOVEN",
        yelpId: "medoven",
        eventId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('places', null, {});
  }
};
