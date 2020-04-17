module.exports = function(sequelize, DataTypes) {
  const Conversation = sequelize.define("Conversation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    participant1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    participant2: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Conversation.associate = models => {
    models.Conversation.hasMany(models.Message, {
      onDelete: "cascade"
    });
    models.Conversation.belongsToMany(models.User, {
      through: "UserConversation"
    });
  };
  return Conversation;
};
