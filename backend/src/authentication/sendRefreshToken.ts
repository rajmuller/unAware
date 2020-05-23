import { Response } from "express";

/**
 * Sets cookie jid: token in res
 */
export const sendRefreshToken = (res: Response, token: string) => {
  const fourTeenDays = 1000 * 60 * 60 * 24 * 14;
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    expires: new Date(Date.now() + fourTeenDays),
  });
};
