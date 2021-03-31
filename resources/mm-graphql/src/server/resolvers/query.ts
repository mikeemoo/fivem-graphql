import { identifiers } from "./session";

export const getActiveSessions = () => {
  const numPlayers = GetNumPlayerIndices();
  const sessions: string[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const sessionId = GetPlayerFromIndex(i);
    if (sessionId) {
      sessions.push(sessionId);
    }
  }
  return sessions;
}

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

export const players = () => [{
  id: 1,
  identifiers: [
    "license:d47b936bd803244bc048084384f44224d0420ebc"
  ],
  fullName: "Michael Michaelson"
}];

export const container = (_, { id }) => ({
  id,
  size: 40,
  items: [{
    id: 1,
    name: "test"
  }]
})