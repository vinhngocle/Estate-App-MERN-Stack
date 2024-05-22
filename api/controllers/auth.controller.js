import * as authService from "../services/auth.service.js";

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
    res
      .setHeader("Set-Cookies", "test=" + "myValue")
      .json({ message: "login successfully.", data: login });
    // res.status(200).json({ message: "login successfully.", data: login });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to Login!" });
  }
};

export const logout = (req, res) => {};
