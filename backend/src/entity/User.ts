import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { Item } from "./Item";

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Field(() => [Item], { nullable: true })
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
