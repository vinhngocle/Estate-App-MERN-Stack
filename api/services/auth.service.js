import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import logger from "../utils/logger.js";

export const create = async (newUser) => {
  const checkUser = await existUser(newUser.username);
  if (checkUser) {
    logger.error("username already exists.");
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

  return await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
      avatar: newUser.avatar || null,
    },
  });
};

export const verifyUser = async (user, expiresIn) => {
  const checkUser = await existUser(user.username);
  if (!checkUser) {
    logger.error("username not found.");
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    user.password,
    checkUser.password
  );
  if (!isPasswordValid) {
    logger.error("password not match.");
    return;
  }

  console.log('user.id', user);
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );

  if (!token) {
    logger.error("token is empty.");
    return;
  }

  return token;
};

export const existUser = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};
