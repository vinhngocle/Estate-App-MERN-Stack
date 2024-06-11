import { PostDataModel, PostDetailModel } from "../models/post.model";
import prisma from "../prisma/prisma-client"
import { Type, Property } from '@prisma/client';
import { getUserIdByEmail } from "./user.service";

export const createPost = async (postData: PostDataModel, postDetail: PostDetailModel, email: string) => {
  const user = await getUserIdByEmail(email);
  const newPost = await prisma.post.create({
    data: {
      title: postData.title,
      price: postData.price,
      images: {
        set: postData.images
      },
      address: postData.address,
      city: postData.city,
      bedroom: postData.bedroom,
      bathroom: postData.bathroom,
      type: postData.type as Type,
      property: postData.property as Property,
      latitude: postData.latitude,
      longitude: postData.longitude,
      user: {
        connect: {
          id: user?.id
        }
      },
      postDetail: {
        create: {
          desc: postDetail.desc,
          utilities: postDetail.utilities,
          pet: postDetail.pet,
          income: postDetail.income,
          size: postDetail.size,
          school: postDetail.school,
          bus: postDetail.bus,
          restaurant: postDetail.restaurant
        }
      }
    },
    include: {
      postDetail: {
        select: {
          desc: true,
          utilities: true,
          pet: true,
          income: true,
          size: true,
          school: true,
          bus: true,
          restaurant: true
        }
      },
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      }
    }
  })

  if (newPost) {
    await prisma.userPost.create({
      data: {
        userId: user.id,
        postId: newPost.id
      }
    })
  }

  return newPost;
}

export const getAllPost = async () => {
  const posts = prisma.post.findMany()
  return posts;
}

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id }
  })
  return post;
}

export const updatePost = async (postData: PostDataModel, postDetail: PostDetailModel, id: number, email: string) => {
  const user = await getUserIdByEmail(email);
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: postData.title,
      price: postData.price,
      images: {
        set: postData.images
      },
      address: postData.address,
      city: postData.city,
      bedroom: postData.bedroom,
      bathroom: postData.bathroom,
      type: postData.type as Type,
      property: postData.property as Property,
      latitude: postData.latitude,
      longitude: postData.longitude,
      user: {
        connect: {
          id: user?.id
        }
      },
      postDetail: {
        update: {
          desc: postDetail.desc,
          utilities: postDetail.utilities,
          pet: postDetail.pet,
          income: postDetail.income,
          size: postDetail.size,
          school: postDetail.school,
          bus: postDetail.bus,
          restaurant: postDetail.restaurant
        }
      }
    },
    include: {
      postDetail: {
        select: {
          desc: true,
          utilities: true,
          pet: true,
          income: true,
          size: true,
          school: true,
          bus: true,
          restaurant: true
        }
      },
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      }
    }
  })

  return post;
}

export const deletePost = async (id: number) => {
  const deleteUserPost = prisma.userPost.deleteMany({
    where: {
      postId: id,
    },
  })
  const deletePostDetail = prisma.postDetail.delete({
    where: {
      postId: id,
    },
  })
  const deletePostData = prisma.post.delete({
    where: {
      id,
    },
  })

  return await prisma.$transaction([deleteUserPost, deletePostDetail, deletePostData])
}