import prisma from "../lib/prisma.js";

export const addMessage = async (text, tokenUserId, chatId) => {
  const newMessage = prisma.message.create({
    data: { text, chatId, userId: tokenUserId },
  });

  await prisma.chat.update({
    where: { id: chatId },
    data: { seenBy: [tokenUserId], lastMessage: text },
  });

  return newMessage;
};

export const existChat = async (chatId, tokenUserId) => {
  return await prisma.chat.findUnique({
    where: { id: chatId, userIDs: { hasSome: [tokenUserId] } },
  });
};
