export const ping = ({ playerId }) =>  GetPlayerPing(playerId);
export const invincible = ({ playerId }) => GetPlayerInvincible(playerId);
export const maxArmour = ({ playerId }) => GetPlayerMaxArmour(playerId);
export const maxHealth = ({ playerId }) => GetPlayerMaxHealth(playerId);
export const name = ({ playerId }) => GetPlayerName(playerId);
export const endpoint = ({ playerId }) => GetPlayerEndpoint(playerId);
export const ped = ({ playerId }) => ({ entityId: GetPlayerPed(playerId) });
export const cameraRotation = ({ playerId }) => {
  const [ x, y, z ] = GetPlayerCameraRotation(playerId);
  return { x, y, z }
}

export const tokens = ({ playerId }) => {
  const numTokens = GetNumPlayerTokens(playerId);
  let tokens = [];
  for (let i = 0; i < numTokens; i++) {
    tokens.push(GetPlayerToken(playerId, i));
  }
  return tokens;
}

export const identifiers = ({ playerId }) => {
  const numIds = GetNumPlayerIdentifiers(playerId);
  let identifiers = [];
  for (let i = 0; i < numIds; i++) {
      identifiers.push(GetPlayerIdentifier(playerId, i));
  }
  return identifiers;
}

