(()=>{"use strict";var e={97:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(n(906));RegisterNuiCallbackType("getInventory"),on("__cfx_nui:getInventory",((e,t)=>r.default("loadInventory",t))),RegisterNuiCallbackType("getFocus"),on("__cfx_nui:getFocus",((e,t)=>(SetNuiFocus(!0,!0),t({}))))},906:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const n={};let o=0;onNet("inventory:callback:response",((e,...t)=>{n[e]&&(n[e](...t),delete n[e])})),t.default=(e,t,...r)=>{const u=String(o++);n[u]=t,emitNet("inventory:callback:request",u,e,...r)}}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var u=t[o]={exports:{}};return e[o].call(u.exports,u,u.exports,n),u.exports}(97)})();