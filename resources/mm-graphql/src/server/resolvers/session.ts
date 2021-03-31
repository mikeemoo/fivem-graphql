import { SessionResolvers } from "types/graphql";

export const getIdentifiers = (sessionId: string) => {
  const numIds = GetNumPlayerIdentifiers(sessionId);
  let identifiers: string[] = [];
  for (let i = 0; i < numIds; i++) {
      identifiers.push(GetPlayerIdentifier(sessionId, i));
  }
  return identifiers;
}

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
  player: ({ identifiers }) => ({
    id: 1,
    identifiers: [
      "license:d47b936bd803244bc048084384f44224d0420ebc"
    ],
    fullName: "Michael Michaelson"
  })
} as SessionResolvers;

