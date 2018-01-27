'use strict';
module.exports = (sequelize, DataTypes) => {
  var voteDates = sequelize.define('voteDates', {
    dateId: DataTypes.INTEGER,
    userEventId: DataTypes.INTEGER
  });

  voteDates.associate = function (models) {
    //association can be defined here
    voteDates.belongsTo(models.userEvents, {
      foreignKey: 'id', sourceKey: 'userEventId'
    })
  }

  return voteDates;
};