import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import logger from "../utils/logger.js";
import crypto from "crypto";
import { hashPassword, verifyHashPassword } from "../utils/passwordHelper.js";
import { sendMail } from "../utils/mailHelper.js";

const exclude = (user, keys) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
};

export const create = async (newUser) => {
  const hashedPassword = await hashPassword(10, newUser.password);
  const user = await prisma.user.create({
    data: {
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
      avatar: newUser.avatar || null,
      emailToken: crypto.randomBytes(64).toString("hex"),
    },
  });
  const userWithoutPassword = exclude(user, ["password"]);

  const urlVerify = `${process.env.BASE_URL}/users/${user.id}/verify/${user.emailToken}`;
  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: newUser.email,
    subject: "Estate-App",
    html: `<div>For verify email your register, please clicking this link below: </div><a href=${urlVerify}>${urlVerify}</a>`,
  };
  if (user) await sendMail(mailOptions);

  return userWithoutPassword;
};

export const login = async (user, hashPassword) => {
  const isPasswordValid = await verifyHashPassword(user.password, hashPassword);

  if (!isPasswordValid) {
    logger.error("password not match.");
    return;
  }

  const expiresTime = "7d";
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: expiresTime }
  );

  if (!accessToken) {
    logger.error("token is empty.");
    return;
  }

  return accessToken;
};

export const verifyEmail = async (id, emailToken) => {
  const expiresTime = "7d";
  const accessToken = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresTime,
  });

  const updateUser = await prisma.user.updateMany({
    where: {
      emailToken,
    },
    data: {
      emailToken: null,
      isVerified: true,
    },
  });

  return { ...updateUser, accessToken };
};

export const existUser = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const existEmailToken = async (emailToken) => {
  return await prisma.user.findUnique({
    where: { emailToken },
  });
};
