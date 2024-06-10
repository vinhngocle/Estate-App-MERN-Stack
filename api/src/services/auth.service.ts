import { AuthModel } from "../models/auth.model";
import prisma from '../prisma/prisma-client';
import bcrypt from 'bcrypt';
import crypto from 'crypto'
import generateToken from "../utils/token.utils";

export const createUser = async (input: AuthModel) => {
  const email = input.email.trim()
  const username = input.username.trim()
  const password = input.password.trim()

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashPassword,
      emailToken: crypto.randomBytes(64).toString('hex')
    },
    select: {
      email: true,
      username: true,
      emailToken: true,
      isVerified: true
    }
  })
  return user;
}

export const login = async (input: any) => {
  const email = input.email.trim()
  const password = input.password.trim()

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      username: true,
      password: true
    }
  })

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email,
        username: user.username,
        token: generateToken(user)
      }
    }
  }

  return user;
}

export const verifyEmail = async (input: any) => {
  const emailToken = input.emailToken.trim()
  const updatedUser = await prisma.user.updateMany({
    where: { emailToken },
    data: {
      isVerified: true,
      emailToken: null
    }
  })

  return updatedUser;
}

export const checkEmailVerified = async (input: any) => {
  const email = input.email.trim()
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}