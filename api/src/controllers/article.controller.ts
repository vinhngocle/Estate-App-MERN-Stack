import { Router, Request, Response, NextFunction } from "express";
import {
  createArticle,
  getArticleBySlug,
  addComment,
  deleteComment,
  favArticle,
  unFavArticle
} from "../services/article.service"
import auth from "../middleware/auth.middleware";

const router = Router();

/**
* Create article
* @auth optional
* @router {POST} /articles
* @body article
* @returns article 
*/
router.post("/articles/", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await createArticle(req.body, req.user?.email as string);
    res.json({ message: "Create article successfully.", data: article })
  } catch (error) {
    next(error)
  }
})

/**
* Get unique article
* @auth optional
* @router {GET} /article/:slug
* @param slug slug of the article (based on the title)
* @returns article 
*/
router.get("/article/:slug", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await getArticleBySlug(req.params.slug)
    res.json({ message: "Get article successfully.", data: article })
  } catch (error) {
    next(error)
  }
})

/**
* create comment
* @auth optional
* @router {POST} /article/:slug/comments
* @param
* @returns comment
*/
router.post("/article/:slug/comments", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await addComment(req.body, req.params.slug, req.user?.email as string)
    res.json({ message: "Create comment successfully.", data: comment })
  } catch (error) {
    next(error)
  }
})

/**
* delete comment
* @auth optional
* @router {DELETE} /article/:slug/comments/:id
* @param
* @returns comment
*/
router.delete("/article/:slug/comments/:id", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await deleteComment(Number(req.params.id), req.user?.email as string)
    res.json({ message: "Delete comment successfully.", data: comment })
  } catch (error) {
    next(error)
  }
})

router.post("/article/:slug/favorite", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorite = await favArticle(req.params.slug, req.user?.email as string)
    res.json({ message: "Save favorite successfully.", data: favorite })
  } catch (error) {
    next(error)
  }
})

router.delete("/article/:slug/un-favorite", auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorite = await unFavArticle(req.params.slug, req.user?.email as string)
    res.json({ message: "Remove favorite successfully.", data: favorite })
  } catch (error) {
    next(error)
  }
})


export default router;