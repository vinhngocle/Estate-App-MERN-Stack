import prisma from "../lib/prisma.js";

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

export const createPost = async (post, tokenUserId) => {
  return await prisma.post.create({
    data: {
      ...post,
      userId: tokenUserId,
    },
  });
};

export const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id },
  })
}

export const existsPost = async (id) => {
  return await prisma.post.findUnique({
    while: { id },
  })
}