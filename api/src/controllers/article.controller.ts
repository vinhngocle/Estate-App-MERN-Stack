import { Router, Request, Response, NextFunction } from "express";
import { createArticle, getArticleBySlug } from "../services/article.service"
import HttpException from "../utils/http-exception";
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

export default router;