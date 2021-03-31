import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { buildClientSchema, graphql, printSchema } from 'graphql';
import { MongoClient, Db } from 'mongodb';
import * as resolvers from './resolvers';
import schema from './graphql.generated.json';
import { Exports } from 'types/exports';

const dbUri = GetConvar('db_uri', 'mongodb://127.0.0.1:27017');
const dbName = GetConvar('db_name', 'mm');

const dbClient = new MongoClient(dbUri, {
  useUnifiedTopology: true,
});

//@ts-ignore-line
const typeDefs = printSchema(buildClientSchema(schema));

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const connect = dbClient.connect().then(() => {
  const db = dbClient.db(dbName);
  new ApolloServer({
    schema: executableSchema,
    debug: false,
    context: { db },
  }).listen({
    port: 8006,
  });
  return db;
});

(global.exports as Exports)('executeQuery', (query, vars, callback) =>
  Promise.resolve(connect).then((db: Db) =>
    graphql(
      executableSchema,
      query,
      null,
      {
        db,
      },
      vars,
    ).then(callback),
  ),
);
