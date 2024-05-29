import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import logger from "../utils/logger.js";
import { hashPassword, verifyHashPassword } from "../utils/passwordHelper.js";

export const create = async (newUser) => {
  const hashedPassword = await hashPassword(10, newUser.password);

  return await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
      avatar: newUser.avatar || null,
    },
  });
};

export const verifyUser = async (user, hashPassword, expireTime) => {
  const isPasswordValid = await verifyHashPassword(user.password, hashPassword);

  if (!isPasswordValid) {
    logger.error("password not match.");
    return;
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: expireTime }
  );

  if (!accessToken) {
    logger.error("token is empty.");
    return;
  }

  return accessToken;
};

export const existUser = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};
