import * as postService from "../services/post.service.js";
import logger from "../utils/logger.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({ message: "Get post successfully.", data: posts });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to get posts." });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Get post successfully.", data: post });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to get post." });
  }
};

export const addPost = async (req, res) => {
  try {
    const post = await postService.createPost(
      req.body,
      req.accessTokenPayLoad.userId
    );

    res.status(200).json({ message: "Create post successfully.", data: post });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.json({ message: "update post" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to update post." });
  }
};

export const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({ message: "Delete post successfully." });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};
