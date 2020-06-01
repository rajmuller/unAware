import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Item } from "../entity/Item";
import { CreateItemInput, UpdateItemInput } from "./types/itemInput";

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items() {
    return await Item.find();
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
