import { ApolloServer, gql } from 'apollo-server';
import * as Query from './resolvers/Query';
import * as Session from './resolvers/Session';
import * as Entity from './resolvers/Entity';

const typeDefs = gql`
  type Session {
    playerId: String!
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
  }

  type Vector3 {
    x: Float!
    y: Float!
    z: Float!
  }

  type Query {
    sessions: [Session!]!
    peds: [Entity!]!
    vehicles: [Entity!]!
    objects: [Entity!]!
  }
`;

const resolvers = {
  Entity,
  Session,
  Query,
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 8006 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
