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
  Conversation.associate = function(models) {
    Conversation.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Conversation;
};
