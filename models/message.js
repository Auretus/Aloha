module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 560]
      },
      allowNull: false
    }
  });
  Message.associate = models => {
    models.Message.belongsTo(models.Conversation);
    models.Message.belongsTo(models.User);
  };
};
