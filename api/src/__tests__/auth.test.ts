// import { mockRequest, mockResponse } from "../__mocks__";
import { userMock } from "../__mocks__/seedData";
import { createUser, login } from "../services/auth.service";
import { prismaMock } from '../prisma/singleton'
import bcrypt from 'bcrypt';
import generateToken from "../utils/token.utils";
// import { getUsers } from "../controllers/user.controller";

// describe("getUsers", () => {
//   it("should return an array of users", () => {
//     getUsers(mockRequest, mockResponse);
//     expect(mockResponse.send).toHaveBeenCalledWith([]);
//   });
// });

jest.mock('bcrypt');
jest.mock('../prisma/prisma-client');
jest.mock('../utils/token.utils');

describe("Auth Service", () => {
  it("should create new user", async () => {
    const user = userMock[0]
    prismaMock.user.create.mockResolvedValue(user);

    await expect(createUser(user)).resolves.toEqual({
      id: 1,
      username: 'Rich',
      email: 'hello@prisma.io',
      password: "1234Aa",
      avatar: null,
      first_name: null,
      last_name: null,
      emailToken: "sometoken",
      isVerified: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    });
  });

  it("should verify email after create new user", async () => {
    const user = userMock[0]
    prismaMock.user.create.mockResolvedValue(user);
    const verifyEmailMock = jest.fn().mockResolvedValue({ count: 1 });

    const usercreate = await createUser(user)

    await expect(verifyEmailMock(usercreate.emailToken)).resolves.toEqual({ count: 1 })
  })

  it("should return user data and token when login is successfull", async () => {
    const user = userMock[0]

    const input = {
      email: 'hello@prisma.io',
      password: "1234Aa",
    };

    // Mock prisma.user.findUnique to return the user
    prismaMock.user.findUnique.mockResolvedValue(user);

    // Mock bcrypt.compare to return true
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    // Mock generateToken to return a token
    (generateToken as jest.Mock).mockReturnValue("mockedtoken");

    const result = await login(input);

    // Log the result for debugging
    console.log('result', result);

    expect(result).toEqual({
      email: user.email,
      username: user.username,
      token: "mockedtoken"
    });
  })

  it("should return null when the password not match", async () => {
    const user = userMock[0]
    const input = {
      email: 'hello@prisma.io',
      password: "1234Aa",
    };

    prismaMock.user.findUnique.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    const result = await login(input);

    // Log the result for debugging
    console.log('result', result);

    expect(result).toBeNull();
  })

  it("should return null when the email not found", async () => {
    const input = {
      email: 'hello@prisma.io',
      password: "1234Aa",
    };

    prismaMock.user.findUnique.mockResolvedValue(null);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await login(input);

    // Log the result for debugging
    console.log('result', result);

    expect(result).toBeNull();
  })
});
