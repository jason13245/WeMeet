'use strict';
module.exports = (sequelize, DataTypes) => {
  var userEvents = sequelize.define('userEvents', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    isJoin: DataTypes.BOOLEAN
  });

  userEvents.associate = function (models) {
    //associations can be defined here
    userEvents.belongsTo(models.events, {
      foreignKey: 'id', sourceKey: 'eventId'
    })

    userEvents.hasMany(models.voteDates, {
      foreignKey: 'userEventId', sourceKey: 'id'
    })

    userEvents.hasMany(models.votePlaces, {
      foreignKey: 'userEventsId', sourceKey: 'id'
    })

    userEvents.belongsTo(models.users, {
      foreignKey: 'id', sourceKey: 'userId'
    })
  }

  return userEvents;
};