import { identifiers } from "./Session";

export const peds = () => GetAllPeds().map((entityId) => ({ entityId }));
export const vehicles = () => GetAllVehicles().map((entityId) => ({ entityId }));
export const objects = () => GetAllObjects().map((entityId) => ({ entityId }));

export const sessions = () => {
  const numPlayers = GetNumPlayerIndices();
  const sessions = [];
  for (let i = 0; i < numPlayers; i++) {
    const sessionId = GetPlayerFromIndex(i);
    if (sessionId) {
      sessions.push({
        sessionId,
        identifiers: identifiers({ sessionId })
      });
    }
  }
  return sessions;
};