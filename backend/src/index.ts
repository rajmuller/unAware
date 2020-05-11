import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";

import { UserResolver } from "./resolvers/UserResolver";
import { ItemResolver } from "./resolvers/ItemResolver";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./authentication/tokens";
import { sendRefreshToken } from "./authentication/sendRefreshToken";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
    })
  );
  app.get("/", (_req, res) => res.send("hello"));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.post("/revoke_token/:userId");

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ItemResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`express backend started on http://localhost:4000`);
  });
})();
