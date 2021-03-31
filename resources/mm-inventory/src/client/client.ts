import { ResolveContainer } from '../types';
import netCallback from './netCallback';

RegisterNuiCallbackType('getInventory');
on('__cfx_nui:getInventory', (_, cb) => netCallback('loadInventory', cb));

RegisterNuiCallbackType('getFocus');
on('__cfx_nui:getFocus', (_, cb) => (SetNuiFocus(true, true), cb({})));
