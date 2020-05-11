import { getConnection } from "typeorm";

import { User } from "../entity/User";

export const revokeRefreshToken = async (userId: string) => {
  await getConnection()
    .getRepository(User)
    .increment({ id: userId }, "tokenVersion", 1);
};
