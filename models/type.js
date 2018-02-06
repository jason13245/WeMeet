'use strict';
module.exports = (sequelize, DataTypes) => {
  var types = sequelize.define('types', {
    eventType: DataTypes.STRING
  });

  types.associate = function (models) {
    //association can be defined here
    types.belongsTo(models.events, {
      foreignKey: 'eventType', sourceKey: 'id'
    })
  }


  return types;
};