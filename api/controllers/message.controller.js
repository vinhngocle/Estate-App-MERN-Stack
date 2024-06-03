import logger from "../utils/logger.js";
import * as messageService from "../services/message.service.js";

export const addMessage = async (req, res) => {
  try {
    const existChat = await messageService.existChat(
      req.params.chatId,
      req.accessTokenPayLoad.userId
    );
    if (!existChat) {
      logger.error("Chat not found!");
      return res.status(404).json({ message: "Chat not found!" });
    }

    const newMessage = await messageService.addMessage(
      req.body.text,
      req.accessTokenPayLoad.userId,
      req.params.chatId
    );
    res
      .status(201)
      .json({ message: "Create message successfully.", data: newMessage });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to add message." });
  }
};
