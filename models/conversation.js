module.exports = function(sequelize) {
  const Conversation = sequelize.define("Conversation", {});
  Conversation.associate = models => {
    models.Conversation.hasMany(models.Message, {
      onDelete: "cascade"
    });
    models.Conversation.hasMany(models.User);
  };
  return Conversation;
};
