import bcrypt from "bcrypt";

export const hashPassword = async (saltRounds, password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return await bcrypt.hashSync(password, salt);
};

export const verifyHashPassword = async (password, hashPassword) => {
  return await bcrypt.compareSync(password, hashPassword);
};
