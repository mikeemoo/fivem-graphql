import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { buildClientSchema, graphql, printSchema } from 'graphql';
import * as resolvers from './resolvers';
import schema from './graphql.generated.json';
import { Exports } from 'types/exports';

//@ts-ignore-line
const typeDefs = printSchema(buildClientSchema(schema));

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

new ApolloServer({
  schema: executableSchema,
  debug: false,
}).listen({
  port: 8006,
});

(global.exports as Exports)('executeQuery', (query, vars, callback) =>
  graphql(executableSchema, query, null, null, vars).then(callback),
);
