import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Item } from "../entity/Item";

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async getAllItems() {
    return await Item.find();
  }

  @Mutation(() => Boolean)
  async createItem(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("image") image: string,
    @Arg("largeImage") largeImage: string
  ) {
    try {
      await Item.insert({
        title,
        description,
        price,
        image,
        largeImage,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
