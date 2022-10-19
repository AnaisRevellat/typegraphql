import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Wilder } from "../entities/Wilder";
import datasource from "../utils";

@Resolver()
export class WildersResolver {

	@Mutation(()=> Wilder)
	async createWilder(@Arg("name") name: string): Promise<Wilder>{
		return await datasource.getRepository(Wilder).save({ name });
	}

	@Mutation(()=> Wilder)
	async deleteWilder(@Arg("id", () => ID) id: number): Promise<Wilder>{
		const wilderToDelete = await datasource
		.getRepository(Wilder)
		.findOne({where: {id}});				
		return await datasource.getRepository(Wilder).remove(wilderToDelete);
	}

	@Query(() => [Wilder])
	async wilders(): Promise<Wilder[]> {
		return await datasource
			.getRepository(Wilder)
			.find({ relations: ["upvotes", "upvotes.skill"] });
	}

	@Query(() => Wilder, { nullable: true })
	async wilder(@Arg("id", () => ID) id: number): Promise<Wilder | null> {
		return await datasource
			.getRepository(Wilder)
			.findOne({where: { id }, relations: ["upvotes", "upvotes.skill"],
			});
	}
}
