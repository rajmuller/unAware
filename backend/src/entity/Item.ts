import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User";

@ObjectType()
@Entity("item")
export class Item extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text", { unique: true })
  title: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column("text")
  image: string;

  @Field()
  @Column("text")
  largeImage: string;

  @Field()
  @Column("int")
  price: number;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.items, { nullable: true })
  user: User;
}
