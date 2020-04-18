module.exports = function(sequelize, DataTypes) {
  const Conversation = sequelize.define("Conversation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    participant1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    participant2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Conversation.associate = models => {
    models.Conversation.hasMany(models.Message, {
      onDelete: "cascade"
    });
  };
  return Conversation;
};
