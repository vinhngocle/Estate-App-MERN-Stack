import prisma from "../prisma/prisma-client";
import HttpException from "../utils/http-exception";

export const getCurrentUser = async (email: string | undefined) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      username: true,
      first_name: true,
      last_name: true,
      avatar: true
    }
  })

  if (!user) {
    throw new HttpException(404, { message: "User not found!!" })
  }

  return { ...user }
}

export const getUserIdByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      first_name: true,
      last_name: true,
      avatar: true
    }
  })

  if (!user) {
    throw new HttpException(404, { message: "User id not found!!" })
  }

  return user;
}