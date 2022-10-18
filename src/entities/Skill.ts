import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Upvote } from "./Upvote";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class Skill {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @ObjectType()
  name: string;

  @OneToMany(() => Upvote, "skill")
  @ObjectType()
  upvotes: Upvote[];
}
