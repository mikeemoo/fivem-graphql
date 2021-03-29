export const ping = ({ playerId }) =>  GetPlayerPing(playerId);
export const invincible = ({ playerId }) => GetPlayerInvincible(playerId);
export const maxArmour = ({ playerId }) => GetPlayerMaxArmour(playerId);
export const maxHealth = ({ playerId }) => GetPlayerMaxHealth(playerId);
export const name = ({ playerId }) => GetPlayerName(playerId);
export const endpoint = ({ playerId }) => GetPlayerEndpoint(playerId);
export const ped = ({ playerId }) => ({ entityId: GetPlayerPed(playerId) });

export const identifiers = ({ playerId }) => {
  const numIds = GetNumPlayerIdentifiers(playerId);
  let identifiers = [];
  for (let i = 0; i < numIds; i++) {
      identifiers.push(GetPlayerIdentifier(playerId, i));
  }
  return identifiers;
}

