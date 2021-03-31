import { ApolloServer, makeExecutableSchema, gql } from 'apollo-server';
import { buildClientSchema, graphql, IntrospectionQuery, printSchema } from 'graphql';
import * as resolvers from './resolvers';
import schema from './graphql.generated.json';
import { Exports } from 'types/exports';
import { Resolvers } from 'types/graphql';

//@ts-ignore
const typeDefs = printSchema(buildClientSchema(schema));

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers,
});

const server = new ApolloServer({
  schema: executableSchema,
  debug: false,
}).listen({
  port: 8006,
});

(global.exports as Exports)('executeQuery', (query, vars, callback) => {
  console.log('executing query');
  graphql(executableSchema, query, null, null, vars).then(callback);
});
