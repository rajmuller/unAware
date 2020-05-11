import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";

import { User } from "../entity/User";
import { MyContext } from "../MyContext";
import {
  createRefreshToken,
  createAccessToken,
} from "../authentication/tokens";
import { isAuth } from "../authentication/isAuthMiddleware";
import { sendRefreshToken } from "../authentication/sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  amILoggedIn(@Ctx() { payload }: MyContext) {
    console.log("payload: ", payload);
    return `your user id is ${payload!.userId}`;
  }

  @Query(() => String)
  getHi() {
    return "HI";
  }

  @Query(() => [User])
  async getAllUsers() {
    return await User.find();
  }

  @Mutation(() => Boolean)
  async registerUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    //TODO: homogenize error messages
    if (!user) {
      throw new Error("No user found");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Successful login

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }
}
