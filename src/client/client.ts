const exp = (global as any).exports

let callbackId = 0;
const callbacks = {};
const callbackNet = (query: string, vars: any = {}, cb: (res: any) => void) => {
  const strId = String(callbackId++);
  callbacks[strId] = cb;
  console.log("calling server");
  emitNet("gql:callback:server", strId, query, vars);
}

onNet("gql:callback:client", (uuid: string, results: any) => {
  console.log("received response");
  if (callbacks[uuid]) {
    callbacks[uuid](results);
    callbacks[uuid] = null;
  }
});


exp("callbackNet", callbackNet);