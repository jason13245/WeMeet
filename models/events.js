'use strict';
module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define('events', {
    createdBy: DataTypes.STRING,
    eventName: DataTypes.STRING,
    url: DataTypes.STRING,
    eventType: DataTypes.STRING
  });

  events.associate = function (models) {
    // associations can be defined here
    events.hasMany(models.userEvents, {
      foreignKey: 'eventId', sourceKey: 'id'
    })

    events.belongsTo(models.users, {
      foreignKey: 'id', sourceKey: 'createdBy'
    })

    events.hasMany(models.type, {
      foreignKey: 'id', sourceKey: 'eventType'
    })

  }

  return events;
};