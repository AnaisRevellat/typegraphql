import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import datasource from "./utils";
import WildersResolver from './resolvers/Wilders';

const typeDefs = gql`

type Skill{
	id: ID!
	upvotes: [Upvote!]!
	name: String!
}

	type Upvote {
	id: ID!
	upvotes: Int!
	skill: Skill!
	wilder: Wilder!
	}

	type Wilder {
		id: ID!
		name: String!
		upvotes: [Upvote!]!
	}

	type Query {
		wilders: [Wilder]
		wilder(id: ID): Wilder
	}

	type Mutation{
		createWilder(name: String!): Wilder!
	}
`;

const resolvers = {
	Query: {
		wilders: WildersResolver.findAll,
		wilder: WildersResolver.find,		
	},
	Mutation: {
		createWilder: WildersResolver.create,
	}
};

// server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: "bounded",
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({ embed: true }),
	],
});

// The `listen` method launches a web server.
server.listen(5000).then(
	async () => {
		console.log(`🚀  Server sarted `);

		try {
			await datasource.initialize();
			console.log("I'm connected!");
		} catch (err) {
			console.log("Dommage");
			console.error(err);
		}
	},
	(err) => console.error(err)
);
