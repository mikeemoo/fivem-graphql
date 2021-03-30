import * as resolvers from './resolvers';

const exp = global.exports;

const schema = `
  type Item {
    id: Int!
    name: String!
  }
  type Container {
    id: String!
    size: Int!
    items: [Item!]!
  }
  type Player {
    inventory: Container!
  }
  type Query {
    container(id: String!): Container
  }
`;

const registerWithGraphQL = () => exp.graphql.register(GetCurrentResourceName(), schema, resolvers);

// if graphql reboots we'll need to re-register our interfaces
on('onResourceStart', (name: string) => name === 'graphql' && registerWithGraphQL());
registerWithGraphQL();

// exp.graphql.executeQuery(
//   `
//     query {
//       items {
//         id
//       }
//     }
//   `,
//   console.log
// )

