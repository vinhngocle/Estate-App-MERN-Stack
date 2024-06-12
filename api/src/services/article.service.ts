import slugify from "slugify"
import { getUserIdByEmail } from "./user.service";
import prisma from "../prisma/prisma-client";
import HttpException from "../utils/http-exception";

export const createArticle = async (article: any, email: string) => {
  const { title, description, body, tagList } = article;

  const user = await getUserIdByEmail(email);
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

export const addComment = async (body: string, slug: string, email: string) => {
  const user = await getUserIdByEmail(email);
  const article = await prisma.article.findUnique({
    where: {
      slug
    },
    select: {
      id: true
    }
  })
  const comment = await prisma.comment.create({
    data: {
      body,
      article: {
        connect: {
          id: article!.id
        }
      },
      author: {
        connect: {
          id: user?.id
        }
      }
    },
    include: {
      author: {
        select: {
          username: true,
          email: true,
          followedBy: true
        }
      }
    }
  })

  return comment;
}

export const deleteComment = async (id: number, email: string) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      author: {
        email
      }
    }
  })

  if (!comment) {
    throw new HttpException(204, { error: "Comment not found!!" })
  }

  await prisma.comment.delete({
    where: { id }
  })
  return null
}

export const favArticle = async (slug: string, email: string) => {
  const user = await getUserIdByEmail(email);
  const article = prisma.article.update({
    where: { slug },
    data: {
      favoritedBy: {
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

export const unFavArticle = async (slug: string, email: string) => {
  const user = await getUserIdByEmail(email);
  const article = prisma.article.update({
    where: { slug },
    data: {
      favoritedBy: {
        disconnect: {
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