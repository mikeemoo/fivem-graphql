import netCallback from "./netCallback";

setTimeout(() => {
  SetNuiFocus(true, true);
}, 5e3)


RegisterNuiCallbackType("getInventory");
on('__cfx_nui:getInventory', (_, cb) => netCallback("loadInventory", cb));
