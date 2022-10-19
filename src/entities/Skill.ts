import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Upvote } from "./Upvote";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Skill {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()  
  name: string;

  @OneToMany(() => Upvote, "skill")
  @Field( ()=> [Upvote])
  upvotes: Upvote[];
}
