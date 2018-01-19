'use strict';
module.exports = (sequelize, DataTypes) => {
  var userChatroom = sequelize.define('userChatrooms', {
    userId: DataTypes.INTEGER,
    isJoin: DataTypes.BOOLEAN,
    chatroomId: DataTypes.INTEGER,
  });

  userChatroom.associate = function (models) {
    // associations can be defined here
    userChatroom.belongsTo(models.users, {
      foreignKey: "id", sourceKey: "userId"
    })
    userChatroom.hasMany(models.voteRestaurants, {
      foreignKey: "userChatroomId", sourceKey: "id"
    })
    userChatroom.belongsTo(models.chatrooms, {
      foreignKey: "id", sourceKey: "chatroomId"
    })
    userChatroom.hasMany(models.voteDates, {
      foreignKey: "userChatroomId", sourceKey: "id"
    })
  }

  return userChatroom;
};