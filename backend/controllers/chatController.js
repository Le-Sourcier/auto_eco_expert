import db from "../models/index.js";
import serverMessage from "../utils/serverMessage.js";

const chatController = {
  createMessage: async (req, res) => {
    try {
      const {
        id,
        content,
        from = "user",
        type = "text",
        options = [],
      } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await db.users.findByPk(id);
      if (!user) return serverMessage(res, "USER_NOT_FOUND", null);

      // Créer le message
      const message = await db.chat_message.create({
        lead_id: id,
        content,
        from,
        type,
        options,
      });

      return serverMessage(res, "SUCCESS", message);
    } catch (error) {
      console.log("ERROR in createMessage:", error);
      return serverMessage(res, "ERROR", null);
    }
  },

  getMessages: async (req, res) => {
    try {
      const { id } = req.params;

      const messages = await db.chat_message.findAll({
        where: { lead_id: id },
        order: [["createdAt", "ASC"]],
      });

      return serverMessage(res, "SUCCESS", messages);
    } catch (error) {
      console.log("ERROR in getMessages:", error);
      return serverMessage(res, "ERROR", null, 500);
    }
  },
};

export default chatController;
