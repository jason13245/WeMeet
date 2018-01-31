'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    facebookId: DataTypes.BIGINT
  });

  users.associate = function (models) {
    //association can be defined here
    users.hasMany(models.events, {
      foreignKey: 'createdBy', sourceKey: 'id', as: "creates"
    })

    users.belongsToMany(models.events, {
      foreignKey: "userId", sourceKey: "id", as: "invited", through: models.userEvents
    })

  }


  return users;
};