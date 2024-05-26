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
