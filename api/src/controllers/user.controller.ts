import { Router, Request, Response, NextFunction } from "express";
import auth from "../middleware/auth.middleware";
import { getCurrentUser } from "../services/user.service";
import multer from "multer";
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import logger from "../utils/logger";

const uploadDir = join(__dirname, '../uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const uploads = multer({ storage: storage });

const router = Router();

router.get('/user/me', auth.require, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getCurrentUser(req.user?.email);
    res.status(200).json({ message: "Get user successfully.", data: user })
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

router.post("/user/upload",
  uploads.single("avatar"),
  auth.require,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "Upload Avatar successfully.", data: req.file })
    } catch (error) {
      logger.error(error)
      next(error)
    }
  })

export default router;
