import { Exports } from 'types/exports';

const graphql = (global.exports as Exports)['mm-graphql'];

const callbacks = {
  loadInventory: (sessionId: string, resolve: Function) => {
    graphql.executeQuery(
      `query GetUserInventory($sessionId: String!) {
            session (sessionId: $sessionId) { player { inventory { id size items { id name } } } }
          }
        `,
      { sessionId },
      ({
        data: {
          session: {
            player: { inventory },
          },
        },
      }) => resolve(inventory),
    );
  },
};

onNet('inventory:callback:request', (id: string, eventName: string, ...params: any[]) => {
  const sessionId = String(source);
  callbacks[eventName](
    sessionId,
    (...args: any[]) => emitNet('inventory:callback:response', sessionId, id, ...args),
    ...params,
  );
});
