import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "../MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  // bearer asdasdasd
  console.log("authorization: ", context.req.headers["authorization"]);
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.error(err);
    throw new Error("not authenticated");
  }

  return next();
};
