import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const newUser = await authService.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully.", data: newUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error creating user!" });
  }
};

export const login = async (req, res) => {
  try {
    const login = await authService.verifyUser(req.body);

    if (!login) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: req.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login Successfully." });

    // res
    //   .status(200)
    //   .json({ message: "Login Successfully.", data: { ...req.body, token } });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to Login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Succesfully." });
};
