'use strict';
module.exports = (sequelize, DataTypes) => {
  var restaurant = sequelize.define('restaurants', {
    name: DataTypes.STRING
  });

  restaurant.associate = function (models) {
    // associations can be defined here
    restaurant.belongsTo(models.voteRestaurants, {
      foreignKey: "id", sourceKey: "restaurantId"
    })
  }

  return restaurant;
};