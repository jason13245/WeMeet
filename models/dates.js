'use strict';
module.exports = (sequelize, DataTypes) => {
  var dates = sequelize.define('dates', {
    date: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
  });

  dates.associate = function (models) {
    // associations can be defined here
    dates.belongsToMany(models.userEvents, {
      foreignKey: "dateId", sourceKey: "id", through: models.voteDates
    })
    dates.belongsTo(models.events, {
      foreignKey: "id", sourceKey: "eventId"
    })
  }
  return dates;
};