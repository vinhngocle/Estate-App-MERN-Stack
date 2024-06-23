import { Router, Request, Response, NextFunction } from "express";
import { regiserUser, verifyEmail } from "../services/auth.service";
import logger from "../utils/logger";

const router = Router();

router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await regiserUser(req.body);
      res.status(201).json({ message: "Create successfull.", data: user });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Create user failed." });
    }
  }
);

router.put(
  "/auth/verify-email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, verify_token } = req.body;
      const verfify = await verifyEmail(email, verify_token);

      if (!verfify) {
        return res.status(400).json({ error: "Email or Token not match." });
      }

      res
        .status(200)
        .json({ message: "Verify user email successfull.", data: verfify });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Verify user email failed." });
    }
  }
);

export default router;
