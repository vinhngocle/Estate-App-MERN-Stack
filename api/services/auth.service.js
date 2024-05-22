import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const create = async (newUser) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

  return await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
    },
  });
};

export const verifyUser = async (user) => {
  const checkUser = await existUser(user.username);
  if (!checkUser) return;

  return await bcrypt.compare(user.password, checkUser.password);
};

export const existUser = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};
