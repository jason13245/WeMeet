'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    facebookId: DataTypes.BIGINT
  });

  users.associate = function (models) {
    //association can be defined here
    users.hasMany(models.events, {
      foreignKey: 'createdBy', sourceKey: 'id'
    })

    users.hasMany(models.userEvents, {
      foreignKey: 'userId', sourceKey: 'id'
    })

  }


  return users;
};