'use strict';
module.exports = (sequelize, DataTypes) => {
  var type = sequelize.define('type', {
    eventType: DataTypes.STRING
  });

  type.associate = function (models) {
    //association can be defined here
    type.belongsTo(models.events, {
      foreignKey: 'eventType', sourceKey: 'id'
    })
  }


  return type;
};