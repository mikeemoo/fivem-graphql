const callbacks = {};
let counter = 0;

onNet("inventory:callback:response", (id: string, ...params: any[]) => {
  if (callbacks[id]) {
    callbacks[id](...params);
    delete callbacks[id];
  }
})

export default (eventName: string, cb: (data: any) => void, ...params: any[] ) => {
  const id = String(counter++);
  callbacks[id] = cb;
  emitNet("inventory:callback:request", id, eventName, ...params);
};