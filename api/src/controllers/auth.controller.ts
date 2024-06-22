import { Router, Request, Response, NextFunction } from "express";
import { regiserUser } from "../services/auth.service";

const router = Router();

router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await regiserUser(req.body);
      res.send(201).json({ message: "Create successfull.", data: user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
