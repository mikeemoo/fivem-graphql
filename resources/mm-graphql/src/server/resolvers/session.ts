import { SessionResolvers } from "types/graphql";
import { getPlayerByIdentifiers } from "../providers/players";
import { getIdentifiers } from "../providers/sessions";

export default {
  ping: ({ sessionId }) =>  GetPlayerPing(sessionId),
  maxArmour: ({ sessionId }) => GetPlayerMaxArmour(sessionId),
  invincible: ({ sessionId }) => GetPlayerInvincible(sessionId),
  maxHealth: ({ sessionId }) => GetPlayerMaxHealth(sessionId),
  name: ({ sessionId }) => GetPlayerName(sessionId),
  endpoint: ({ sessionId }) => GetPlayerEndpoint(sessionId),
  ped: ({ sessionId }) => ({ entityId: GetPlayerPed(sessionId) }),
  cameraRotation: ({ sessionId }) => {
    const [ x, y, z ] = GetPlayerCameraRotation(sessionId);
    return { x, y, z }
  },
  tokens: ({ sessionId }) => {
    const numTokens = GetNumPlayerTokens(sessionId);
    let tokens = [];
    for (let i = 0; i < numTokens; i++) {
      tokens.push(GetPlayerToken(sessionId, i));
    }
    return tokens;
  },
  identifiers: ({ sessionId }) => getIdentifiers(sessionId),
  player: ({ identifiers }, _, { db }) => getPlayerByIdentifiers(db, identifiers)
} as SessionResolvers;

