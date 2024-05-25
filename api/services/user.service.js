import prisma from "../lib/prisma.js";
import logger from "../utils/logger.js";

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (id) => {
  const checkId = await existUserId(id);
  if (!checkId) {
    logger.error("user id not exists.");
    return;
  }

  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUserById = async (id, user) => {
  const checkId = await existUserId(id);
  if (!checkId) {
    logger.error("user id not exists.");
    return;
  }

  return await prisma.user.update({
    where: { id },
    data: user,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id) => {
  const checkId = await existUserId(id);
  if (!checkId) {
    logger.error("user id not exists.");
    return;
  }

  return await prisma.user.delete({
    where: { id },
  });
};

export const existUserId = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};
