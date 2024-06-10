import slugify from "slugify"
import { getUserIdByUserName } from "./user.service";
import prisma from "../prisma/prisma-client";
import HttpException from "../utils/http-exception";

export const createArticle = async (article: any, email: string) => {
  const { title, description, body, tagList } = article;

  const user = await getUserIdByUserName(email);
  console.log('user', user)
  const slug = `${slugify(title)}-${user?.id}`
  console.log('slug', slug)
  const existingArticle = await prisma.article.findUnique({
    where: { slug },
    select: { slug: true }
  })

  if (existingArticle) {
    {
      throw new HttpException(422, { error: { title: ['must be unique'] } })
    }
  }

  const createArticle = await prisma.article.create({
    data: {
      title,
      slug,
      body,
      description,
      tagList: {
        connectOrCreate: tagList.map((tag: string) => ({
          create: { name: tag },
          where: { name: tag }
        }))
      },
      author: {
        connect: {
          id: user?.id
        }
      }
    },
    include: {
      tagList: {
        select: {
          name: true
        }
      },
      author: {
        select: {
          username: true,
          avatar: true,
          first_name: true,
          last_name: true
        }
      }
    }
  })

  return createArticle;
}

export const getArticleBySlug = async (slug: any) => {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      tagList: {
        select: {
          name: true
        }
      },
      author: {
        select: {
          username: true,
          email: true,
          avatar: true
        }
      },
      comments: {
        select: {
          id: true,
          body: true,
          author: {
            select: {
              username: true,
              email: true,
              avatar: true
            }
          }
        }
      }
    }
  })

  return article;
}