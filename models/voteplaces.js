'use strict';
module.exports = (sequelize, DataTypes) => {
  var votePlaces = sequelize.define('votePlaces', {
    placeId: DataTypes.INTEGER,
    userEventId: DataTypes.INTEGER
  });

  votePlaces.associate = function (models) {
    //association can be defined here
    votePlaces.belongsTo(models.userEvents, {
      foreignKey: 'id', sourceKey: 'userEventId'
    })

    votePlaces.belongsTo(models.places,{
      foreignKey:'id', sourceKey:'placeId'
    })
  }

  return votePlaces;
};