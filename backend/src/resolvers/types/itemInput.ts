import { Field, InputType } from "type-graphql";
import { Item } from "../../entity/Item";

@InputType()
export class CreateItemInput implements Partial<Item> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  largeImage?: string;
}

@InputType()
export class UpdateItemInput implements Partial<Item> {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;
}
