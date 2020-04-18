module.exports = function(sequelize) {
  const UserConversation = sequelize.define(
    "UserConversation",
    {},
    { timestamps: false }
  );
  UserConversation.associate = models => {
    models.User.belongsToMany(models.Conversation, {
      through: "UserConversation",
      onDelete: "cascade"
    });
    models.Conversation.belongsToMany(models.User, {
      through: "UserConversation"
    });
    models.User.hasMany(models.UserConversation);
    models.UserConversation.belongsTo(models.User);
    models.Conversation.hasMany(models.UserConversation);
    models.UserConversation.belongsTo(models.Conversation);
  };
  return UserConversation;
};
