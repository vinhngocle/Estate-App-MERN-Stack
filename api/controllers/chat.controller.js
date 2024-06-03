import logger from "../utils/logger.js";
import * as chatService from "../services/chat.service.js";

export const getChats = async (req, res) => {
  try {
    const chats = chatService.getChats(req.accessTokenPayLoad.userId);
    res.status(200).json({ message: "Get chats successfully.", data: chats });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to get all chat." });
  }
};

export const getChat = async (req, res) => {
  try {
    const chat = await chatService.getChat(
      req.params.id,
      req.accessTokenPayLoad.userId
    );
    res.status(200).json({ message: "Get chat successfully.", data: chat });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to get chat by id." });
  }
};

export const addChat = async (req, res) => {
  try {
    const newChat = await chatService.createChat(
      req.accessTokenPayLoad.userId,
      req.body.receiverId
    );
    res.status(201).json({ message: "Create successfully!", data: newChat });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to create new chat." });
  }
};

export const readChat = async (req, res) => {
  try {
    const chat = chatService.readChat(
      req.params.id,
      req.accessTokenPayLoad.userId
    );
    res.status(200).json({ message: "Read chat successfully!", data: chat });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to read chat by id." });
  }
};
