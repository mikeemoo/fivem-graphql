import { QueryResolvers } from "types/graphql";
import { getContainer } from "../providers/containers";
import { getActiveSessions, getIdentifiers } from "../providers/sessions";
import { getPlayers } from "../providers/players";

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
  players: (_, __, { db }) => getPlayers(db),
  container: (_, { id }) => getContainer(id)
} as QueryResolvers;