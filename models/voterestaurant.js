'use strict';
module.exports = (sequelize, DataTypes) => {
  var voteRestaurant = sequelize.define('voteRestaurants', {
    userChatroomId: DataTypes.INTEGER
  });

  voteRestaurant.associate = function (models) {
    // associations can be defined here
    voteRestaurant.belongsTo(models.userChatrooms, {
      foreignKey: "id", sourceKey: "userChatroomId"
    });

    voteRestaurant.belongsTo(models.restaurants, {
      foreignKey: "id", sourceKey: "id"
    })
  }


  return voteRestaurant;
};