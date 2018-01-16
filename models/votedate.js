'use strict';
module.exports = (sequelize, DataTypes) => {
  var voteDate = sequelize.define('voteDates', {
    date: DataTypes.INTEGER
  });

  voteDate.associate = function (models) {
    // associations can be defined here
    voteDate.belongsTo(models.userChatrooms, {
      foreignKey: "id", sourceKey: "userChatroomId"
    })
  }

  return voteDate;
};