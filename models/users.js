'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('users', {
    userName: DataTypes.STRING,
    facebookId: DataTypes.BIGINT
  });

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.chatrooms, {
      foreignKey: "createdBy", sourceKey: "id", as: "creates"
    })
    user.belongsToMany(models.chatrooms, {
      foreignKey: "userId", sourceKey: "id", as: "invited", through: models.userChatrooms
    })
  }
};