import { InventoryCallbacks } from '../types';

const callbacks: { [key: string]: Function } = {};
let counter = 0;

onNet('inventory:callback:response', (id: string, ...params: any[]) => {
  if (callbacks[id]) {
    callbacks[id](...params);
    delete callbacks[id];
  }
});

export default <K extends Function>(
  eventName: keyof InventoryCallbacks,
  cb: K,
  ...params: any[]
) => {
  const id = String(counter++);
  callbacks[id] = cb;
  emitNet('inventory:callback:request', id, eventName, ...params);
};
