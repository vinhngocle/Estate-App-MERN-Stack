import prisma from "../prisma/prisma-client";

export const getCurrentUser = async (username: string | undefined) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      email: true,
      username: true
    }
  })

  return { ...user }
}