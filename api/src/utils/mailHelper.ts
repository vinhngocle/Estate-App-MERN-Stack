import nodemailer from "nodemailer";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.PASSWORD_EMAIL_HOST,
  },
});

export const sendMail = async (mailOptions: any) => {
  try {
    await transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        logger.warn(error);
      } else {
        logger.debug("Email sent: " + info.response);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
