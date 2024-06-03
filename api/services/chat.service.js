import prisma from "../lib/prisma.js";

export const getChats = async (tokenUserId) => {
  return await prisma.chat.findMany({
    where: {
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
  });
};

export const getChat = async (id, tokenUserId) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
      userIDs: {
        hasSome: [tokenUserId],
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  await prisma.chat.update({
    where: { id },
    data: {
      seenBy: {
        set: [tokenUserId],
      },
    },
  });

  return chat;
};

export const createChat = async (tokenUserId, receiverId) => {
  return await prisma.chat.create({
    data: {
      userIDs: [tokenUserId, receiverId],
    },
  });
};

export const readChat = async (id, tokenUserId) => {
  return await prisma.chat.update({
    where: { id, userIDs: { hasSome: [tokenUserId] } },
    data: {
      seenBy: {
        set: [tokenUserId],
      },
    },
  });
};
