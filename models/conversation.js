module.exports = function(sequelize, DataTypes) {
  const Conversation = sequelize.define("Conversation", {
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Conversation;
};
