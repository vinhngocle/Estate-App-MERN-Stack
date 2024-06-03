import * as postService from "../services/post.service.js";
import logger from "../utils/logger.js";
import Joi from "joi";

const schemaPostData = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  images: Joi.array(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  bedroom: Joi.number().required(),
  bathroom: Joi.number().required(),
  type: Joi.string().required(),
  property: Joi.string().required(),
  latitude: Joi.any(),
  longitude: Joi.any(),
}).options({ allowUnknown: true });

const schemaPostDetail = Joi.object({
  desc: Joi.string().required(),
  utilities: Joi.string().required(),
  pet: Joi.string().required(),
  income: Joi.string().required(),
  size: Joi.number().required(),
  school: Joi.number().required(),
  bus: Joi.number().required(),
  restaurant: Joi.number().required(),
}).options({ allowUnknown: true });

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
    const { error: error1 } = await schemaPostData.validate(req.body.postData);
    const { error: error2 } = await schemaPostDetail.validate(
      req.body.postDetail
    );

    if (error1 || error2) {
      const errorDetails = [];
      if (error1) errorDetails.push(error1.details);
      if (error2) errorDetails.push(error2.details);

      return res.status(400).send({ message: errorDetails.flat() });
    }

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

export const savePost = async (req, res) => {
  try {
    console.log("save post");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to saved post." });
  }
};
