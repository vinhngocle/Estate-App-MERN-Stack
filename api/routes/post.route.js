import express from "express";
import { verifyToken } from "../middleware/verifyToken.mwd.js";
import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  savePost,
  uploadFile,
} from "../controllers/post.controller.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/uploads");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const uploads = multer({ storage: storage });

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.post("/save", verifyToken, savePost);
router.post("/uploads", uploads.array("photos"), verifyToken, uploadFile);

export default router;
