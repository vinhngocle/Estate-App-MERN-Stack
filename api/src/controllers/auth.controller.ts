import { Router, Request, Response, NextFunction } from "express";
const router = Router();

router.get(
  "/auth/test",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ message: "Create user successfully." });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
