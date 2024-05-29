import * as postService from "../services/post.service.js";
import logger from "../utils/logger.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).send({ message: "Get post successfully.", data: posts });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to get posts." });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }
    res.status(200).send({ message: "Get post successfully.", data: post });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to get post." });
  }
};

export const addPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.userId);
    res.status(200).send({ message: "Get post successfully.", data: post });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to create post." });
  }
};

export const updatePost = async (req, res) => {
  try {
    
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to update post." });
  }
}

export const deletePost = async (req, res) => {
  try {
    const existsPost = await postService.existsPost(req.params.id)
    const tokenUserId = req.userId
    if (existsPost.userId !== tokenUserId) {
      return res.status(403).send({ message: "Not authorized to delete post." });
    }

    await postService.deletePost(req.params.id)
    res.status(200).send({ message: "Post delete successfully." });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to delete post." });
  }
}
