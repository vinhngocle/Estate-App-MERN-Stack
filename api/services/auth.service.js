import bcrypt from "bcrypt";
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
  const existUser = await this.existUser(user.username);
  if (!existUser) return

  return await bcrypt.compare(user.password, existUser.password)
};

export const existUser = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
}