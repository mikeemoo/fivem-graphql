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
on('onResourceStart', (name: string) => name === 'graphql' && registerWithGraphQL());
registerWithGraphQL();

const callbacks = {
   loadInventory: (sessionId: string, resolve: Function) => {
     
      exp.graphql.executeQuery(
        `query GetUserInventory($sessionId: String!) {
            session (sessionId: $sessionId) {
              player {
                inventory {
                  id
                  size
                  items {
                    id
                    name
                  }
                }
              }
            }
          }
        `,
        {
          sessionId
        },
        ({ data: { session: { player: { inventory }}}}) => {
          console.log("resolved", inventory);
          resolve(inventory)
        }
      )
   }
}

onNet("inventory:callback:request", (id: string, eventName: string, ...params: any[]) => {
  const sessionId = String(source);
  callbacks[eventName](sessionId, (...args: any[]) => 
    emitNet("inventory:callback:response", sessionId, id, ...args), ...params);
})


