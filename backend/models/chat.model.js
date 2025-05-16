import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default (sequelize) => {
  const ChatMessage = sequelize.define(
    "chat_message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lead_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "leads",
          key: "id",
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      from: {
        type: DataTypes.ENUM("user", "bot"),
        allowNull: true,
        defaultValue: "bot",
      },
      type: {
        type: DataTypes.ENUM("text", "buttons", "input"),
        allowNull: false,
        defaultValue: "text",
      },
    },
    {
      hooks: {
        // 1) Ensure an ID and a token exist BEFORE validation
        beforeValidate: (chat, options) => {
          // If no id, generate one (though defaultValue usually does this)
          if (!chat.id) {
            chat.id = uuidv4();
          }
        },
      },
    }
  );
  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.leads, {
      foreignKey: "id",
      as: "lead",
      onDelete: "CASCADE",
    });
  };

  return ChatMessage;
};
