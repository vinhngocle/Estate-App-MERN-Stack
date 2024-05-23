import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const verifyUser = async (user, expiresIn) => {
  const checkUser = await existUser(user.username);
  if (!checkUser) {
    console.log('user not found');
    return
  };

  const isPasswordValid = await bcrypt.compare(user.password, checkUser.password);
  if (!isPasswordValid) {
    console.log('password mismatch');
    return
  };

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );

  return token;
};

export const existUser = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};
