'use strict';
module.exports = (sequelize, DataTypes) => {
  var places = sequelize.define('places', {
    placeName: DataTypes.STRING,
    yelpId: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
  });

  places.associate = function (models) {
    //association can be defined here
    places.hasMany(models.votePlaces, {
      foreignKey: 'placeId', sourceKey: 'id'
    })

    places.belongsTo(models.events, {
      foreignKey: "id", sourceKey: "eventId"
    })
  }

  return places;
};