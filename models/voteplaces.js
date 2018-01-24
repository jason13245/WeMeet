'use strict';
module.exports = (sequelize, DataTypes) => {
  var votePlaces = sequelize.define('votePlaces', {
    placesId: DataTypes.INTEGER,
    userEventsId: DataTypes.INTEGER
  });

  votePlaces.associate = function (models) {
    //association can be defined here
    votePlaces.belongsTo(models.userEvents, {
      foreignKey: 'id', sourceKey: 'userEventsId'
    })

    votePlaces.belongsTo(models.places,{
      foreignKey:'id', sourceKey:'placesId'
    })
  }

  return votePlaces;
};