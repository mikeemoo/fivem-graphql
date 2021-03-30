import { identifiers } from "./Session";

export const peds = () => GetAllPeds().map((entityId) => ({ entityId }));
export const vehicles = () => GetAllVehicles().map((entityId) => ({ entityId }));
export const entities = () => GetAllObjects().map((entityId) => ({ entityId }));
export const entity = (_, { entityId }) => GetAllObjects().includes(entityId) ? ({ entityId }) : null;

export const session = (_, { sessionId }: { sessionId: string }) => ({
  sessionId,
  identifiers: identifiers({ sessionId })
})

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