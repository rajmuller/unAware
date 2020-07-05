import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

import { Permission, User } from "../entity/User";
import { MyContext } from "../MyContext";
import {
  createAccessToken,
  createRefreshToken,
} from "../authentication/tokens";
import { isAuth } from "../authentication/isAuthMiddleware";
import { sendRefreshToken } from "../authentication/sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  isLoggedIn(@Ctx() { payload }: MyContext) {
    console.log("payload: ", payload);
    return `your user id is ${payload!.userId}`;
  }

  @Query(() => String)
  hello() {
    return "hello te kis zseni developer";
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("permission", () => [Permission], { defaultValue: [Permission.USER] })
    permission: Permission[]
  ): Promise<User> {
    const hashedPassword = await hash(password, 12);

    try {
      return await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        permission: permission,
      }).save();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("invalid username or password");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("invalid username or password");
    }

    // Successful login

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async logoutUser(@Ctx() { res }: MyContext): Promise<boolean> {
    sendRefreshToken(res, "");

    return true;
  }
}
