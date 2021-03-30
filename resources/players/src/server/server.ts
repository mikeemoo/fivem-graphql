import * as resolvers from './resolvers';

const exp = global.exports;

const schema = `
  type Player {
    id: Int!
    identifiers: [String!]!
    fullName: String!
  }
  type Session {
    player: Player!
  }
  type Query {
    players: [Player!]!
  }
`;

const registerWithGraphQL = () => exp.graphql.register(GetCurrentResourceName(), schema, resolvers);

// if graphql reboots we'll need to re-register our interfaces
on('onResourceStart', (name: string) => name === 'graphql' && registerWithGraphQL());
registerWithGraphQL();
