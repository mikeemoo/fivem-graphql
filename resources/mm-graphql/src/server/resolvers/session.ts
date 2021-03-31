export const ping = ({ sessionId }) =>  GetPlayerPing(sessionId);
export const invincible = ({ sessionId }) => GetPlayerInvincible(sessionId);
export const maxArmour = ({ sessionId }) => GetPlayerMaxArmour(sessionId);
export const maxHealth = ({ sessionId }) => GetPlayerMaxHealth(sessionId);
export const name = ({ sessionId }) => GetPlayerName(sessionId);
export const endpoint = ({ sessionId }) => GetPlayerEndpoint(sessionId);
export const ped = ({ sessionId }) => ({ entityId: GetPlayerPed(sessionId) });
export const cameraRotation = ({ sessionId }) => {
  const [ x, y, z ] = GetPlayerCameraRotation(sessionId);
  return { x, y, z }
}

export const tokens = ({ sessionId }) => {
  const numTokens = GetNumPlayerTokens(sessionId);
  let tokens = [];
  for (let i = 0; i < numTokens; i++) {
    tokens.push(GetPlayerToken(sessionId, i));
  }
  return tokens;
}

export const identifiers = ({ sessionId }) => {
  const numIds = GetNumPlayerIdentifiers(sessionId);
  let identifiers = [];
  for (let i = 0; i < numIds; i++) {
      identifiers.push(GetPlayerIdentifier(sessionId, i));
  }
  return identifiers;
}

export const player = ({ identifiers }) => ({
  id: 1,
  identifiers: [
    "license:d47b936bd803244bc048084384f44224d0420ebc"
  ],
  fullName: "Michael Michaelson"
})
