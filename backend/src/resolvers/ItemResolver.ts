import { Arg, Args, Int, Mutation, Query, Resolver } from "type-graphql";
import { Item } from "../entity/Item";
import { CreateItemInput, UpdateItemInput } from "./types/itemInput";
import { ItemsArgs } from "./types/itemArgs";

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items(@Args() { skip, take }: ItemsArgs) {
    return await Item.find({
      order: { createdDate: "DESC" },
      skip,
      take,
    });
  }

  @Query(() => Int)
  async numberOfItems() {
    return await Item.count();
  }

  @Query(() => Item)
  async item(@Arg("id") id: string) {
    return await Item.findOne(id);
  }

  @Mutation(() => Item)
  async createItem(@Arg("data") createItemData: CreateItemInput) {
    try {
      const item = await Item.create({
        ...createItemData,
      }).save();
      console.log(item);
      return item;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Mutation(() => Item, { nullable: true })
  async updateItem(
    @Arg("data") { title, price, description, id }: UpdateItemInput
  ): Promise<Item | null> {
    const item = await Item.findOne(id);
    console.log(item);
    if (!item) {
      return null;
    }

    if (title) {
      item.title = title;
    }
    if (description) {
      item.description = description;
    }
    if (price) {
      item.price = price;
    }
    await item.save();
    return item;
  }

  @Mutation(() => Boolean)
  async deleteItem(@Arg("id") id: string): Promise<Boolean> {
    const item = await Item.findOne(id);
    console.log(item);
    if (!item) {
      return false;
    }
    await item.remove();
    return true;
  }
}
