import { Request, Response } from "express";

// Mock request object
export const mockRequest = (
  body: any = {},
  params: any = {},
  query: any = {},
  headers: any = {},
  method: string = 'GET',
  url: string = ''
): Request => {
  return {
    body,
    params,
    query,
    headers,
    method,
    url,
    get: jest.fn().mockReturnValue(null),
    header: jest.fn().mockReturnValue(null)
  } as unknown as Request;
};

// Mock response object
export const mockResponse = (): Response => {
  const res: Partial<Response> = {};

  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as Response;
}