'use strict';
module.exports = (sequelize, DataTypes) => {
  var events = sequelize.define('events', {
    createdBy: DataTypes.STRING,
    eventName: DataTypes.STRING,
    url: DataTypes.STRING,
    eventType: DataTypes.INTEGER
  });

  events.associate = function (models) {
    // associations can be defined here

    events.belongsTo(models.users, {
      foreignKey: 'id', sourceKey: 'createdBy', as: "creates"
    })

    events.belongsToMany(models.users, {
      foreignKey: "eventId", sourceKey: "id", as: "invited", through: models.userEvents
    })

    events.hasMany(models.types, {
      foreignKey: 'id', sourceKey: 'eventType'
    })

  }

  return events;
};