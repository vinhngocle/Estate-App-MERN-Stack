import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const verifyToken = (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      req.accessTokenPayLoad = decoded;

      if (!decoded.userId) {
        return res.status(401).json({
          msg: "Invalid token payload.",
        });
      }
      next();
    } catch (err) {
      logger.err(err);
      return res.status(401).json({
        msg: "Invalid access token.",
      });
    }
  } else {
    return res.status(400).json({
      msg: "Invalid access token.",
    });
  }
};
