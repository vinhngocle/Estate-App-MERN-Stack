import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const newUser = await authService.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully.", data: newUser });
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: "Error creating user!" });
  }
};

export const login = async (req, res) => {
  try {
    const expiresIn = 1000 * 60 * 60 * 24 * 7;
    const token = await authService.verifyUser(req.body, expiresIn);

    if (!token) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: expiresIn,
      })
      .status(200)
      .json({ message: "Login Successfully." });
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: "Failed to Login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Successfully." });
};
