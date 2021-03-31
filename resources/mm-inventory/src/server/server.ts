import { Exports } from 'types/exports';
import { InventoryCallbacks } from '../types';
const graphql = (global.exports as Exports)['mm-graphql'];

const callbacks: InventoryCallbacks = {
  loadInventory: (sessionId, resolve) => {
    graphql.executeQuery(
      `query GetUserInventory($sessionId: String!) {
            session (sessionId: $sessionId) { player { inventory { id size items { id name } } } }
          }
        `,
      { sessionId },
      ({ data }) => resolve(data?.session?.player?.inventory),
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
