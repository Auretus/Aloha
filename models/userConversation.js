module.exports = function(sequelize, DataTypes) {
  const UserConversation = sequelize.define("UserConversation", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });
};