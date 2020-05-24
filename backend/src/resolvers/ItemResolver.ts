import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Item } from "../entity/Item";

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items() {
    return await Item.find();
  }

  @Mutation(() => String)
  async createItem(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("image", { nullable: true }) image: string,
    @Arg("largeImage", { nullable: true }) largeImage: string
  ) {
    try {
      const item = await Item.insert({
        title,
        description,
        price,
        image,
        largeImage,
      });
      console.log(item.identifiers[0].id);
      return item.identifiers[0].id;
    } catch (e) {
      console.log("MEGDOGLOTT: ", e);
      return false;
    }
  }
}
