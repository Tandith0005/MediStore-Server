import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  meta?: any;
};

export const sendResponse = <T>(
  res: Response,
  options: TResponse<T>
) => {
  const { statusCode, success, message, data, meta } = options;

  return res.status(statusCode).json({
    success,
    message,
    data,
    meta,
  });
};