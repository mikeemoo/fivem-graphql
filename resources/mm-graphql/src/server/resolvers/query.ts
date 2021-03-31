import { QueryResolvers } from "types/graphql";
import { getIdentifiers, identifiers } from "./session";

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

const fetchPlayers = () => [{
  id: 1,
  identifiers: [
    "license:d47b936bd803244bc048084384f44224d0420ebc"
  ],
  fullName: "Michael Michaelson"
}];

const fetchContainer = (id: string) => ({
  id,
  size: 40,
  items: [{
    id: 1,
    name: "test"
  }]
})

export default {
  peds: () => GetAllPeds().map((entityId) => ({ entityId })),
  vehicles: () => GetAllVehicles().map((entityId) => ({ entityId })),
  entities: () => GetAllObjects().map((entityId) => ({ entityId })),
  entity: (_, { entityId }) => GetAllObjects().includes(entityId) ? ({ entityId }) : null,
  session: (_, { sessionId }: { sessionId: string }) => ({
    sessionId,
    identifiers: getIdentifiers(sessionId)
  }),
  sessions: () => getActiveSessions()
    .map((sessionId) => ({
      sessionId,
      identifiers: getIdentifiers(sessionId)
    })),
  players: () => fetchPlayers(),
  container: (_, { id }) => fetchContainer(id)
} as QueryResolvers;