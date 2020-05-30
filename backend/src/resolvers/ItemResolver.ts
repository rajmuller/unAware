import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Item } from "../entity/Item";

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items() {
    return await Item.find();
  }

  @Mutation(() => Item)
  async createItem(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("image", { nullable: true }) image: string,
    @Arg("largeImage", { nullable: true }) largeImage: string
  ) {
    try {
      const item = await Item.create({
        title,
        description,
        price,
        image,
        largeImage,
      }).save();
      console.log(item);
      return item;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
