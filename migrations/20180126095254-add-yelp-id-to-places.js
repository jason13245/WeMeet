'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'places',
        'yelpId',
        {
          type: Sequelize.STRING,
        }
      )]
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('places', 'yelpId')
    ]
  }
};
