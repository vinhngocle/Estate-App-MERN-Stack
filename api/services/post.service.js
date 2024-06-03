import prisma from "../lib/prisma.js";

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      postDetail: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export const createPost = async (post, userId) => {
  return await prisma.post.create({
    data: {
      ...post.postData,
      userId,
      postDetail: {
        create: post.postDetail,
      },
    },
  });
};

export const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id },
  });
};

export const existsPost = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

export const savedPost = async() => {
  
}