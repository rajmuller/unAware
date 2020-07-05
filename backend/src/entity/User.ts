import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { Item } from "./Item";

export enum Permission {
  ADMIN = "admin",
  USER = "user",
  ITEMCREATE = "itemcreate",
  ITEMDELETE = "itemdelete",
  PERMISSIONUPDATE = "permissionupdate",
}

registerEnumType(Permission, {
  name: "Permission",
});

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field(() => [Permission], { defaultValue: Permission.USER })
  @Column("text")
  permission: Permission[];

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Field(() => [Item], { nullable: true })
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
