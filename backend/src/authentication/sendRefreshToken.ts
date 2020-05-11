import { Response } from 'express';

/**
 * Sets cookie jid: token in res
 */
export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
  });
};
