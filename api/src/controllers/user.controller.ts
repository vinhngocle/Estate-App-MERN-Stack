import { Router, Request, Response, NextFunction } from "express";
import auth from "../middleware/auth.middleware";
import { getCurrentUser } from "../services/user.service";

const router = Router();

router.get('/user/me', auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getCurrentUser(req.user?.email);
    res.status(200).json({ message: "Get user successfully.", data: user })
  } catch (error) {
    next(error)
  }
})

export default router;
