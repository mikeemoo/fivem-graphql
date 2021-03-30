import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { graphql } from 'graphql';
import * as coreResolvers from './resolvers';

const schemaRegister: { [key: string]: string } = {};
const resolverRegister: { [key: string]: any } = {};

let currentExecutableSchema = null;
let activeServer = null;

const recreateSchema = () => {

  const mergedTypeDefs = mergeTypeDefs(Object.values(schemaRegister));
  const mergedResolvers = mergeResolvers(Object.values(resolverRegister));

  currentExecutableSchema = null;
  currentExecutableSchema = makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  });

  (async () => {
    if (activeServer) {
      await activeServer.stop();
    }
    activeServer = new ApolloServer({
      schema: currentExecutableSchema,
      // due to weird handling of error objects by this node environment, we have to disable debug
      // (something to do with Error.stack being an array instead of string)
      debug: false,
    });

    activeServer.listen({
      port: 8006,
    });
  })();
};

const executeQuery = (query: string, vars: any = {}, callback: (res: any) => {}) =>
  graphql(currentExecutableSchema, query, null, null, vars).then(callback);

const registerResolver = (namespace: string, type: string, prop: string, fn: Function) => {
  if (!resolverRegister[namespace][type]) resolverRegister[namespace][type] = {};
  resolverRegister[namespace][type][prop] = (parent: any, args: any) => fn(parent, args);
};

const register = (namespace: string, schema: string, resolvers: any) => {
  schemaRegister[namespace] = schema;
  resolverRegister[namespace] = {};
  Object.keys(resolvers).forEach(type =>
    Object.keys(resolvers[type]).forEach(prop =>
      registerResolver('graphql', type, prop, resolvers[type][prop]),
    ),
  );
  recreateSchema();
};

register(
  'graphql',
  `type Session {
    sessionId: String!
    name: String!
    ping: Int!
    invincible: Boolean!
    identifiers: [String]!
    maxArmour: Float!
    maxHealth: Float!
    endpoint: String!
    ped: Entity!
    tokens: [String!]!
    cameraRotation: Vector3!
    player: Player!
  }

  type Player {
    session: Session
  }

  type Entity {
    entityId: Int!
    isPlayer: Boolean!
    armour: Float!
    maxHealth: Float!
    health: Float!
    rotation: Vector3!
    heading: Float!
    coords: Vector3!
    modelHash: String!
    type: String!
    populationType: String!
    causeOfDeath: String
    currentVehicle: Entity
    lastVehicle: Entity
    numberPlate: String!
    session: Session
  }

  type Vector3 {
    x: Float!
    y: Float!
    z: Float!
  }

  type Query {
    sessions: [Session!]!
    session(sessionId: String!): Session
    peds: [Entity!]!
    vehicles: [Entity!]!
    entities: [Entity!]!
    entity(entityId: Int!): Entity
  }`,
  coreResolvers,
);

global.exports('executeQuery', executeQuery);
global.exports('register', register);