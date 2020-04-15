module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    fromUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    toUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Message.associate = function(models) {
    Message.belongsTo(models.Conversation, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Message;
};
