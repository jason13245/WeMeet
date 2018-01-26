'use strict';
module.exports = (sequelize, DataTypes) => {
  var places = sequelize.define('places', {
    eventName: DataTypes.STRING,
    yelpId: DataTypes.STRING
  });

  places.associate = function (models) {
    //association can be defined here
    places.hasMany(models.votePlaces, {
      foreignKey: 'placeId', sourceKey: 'id'
    })
  }

  return places;
};