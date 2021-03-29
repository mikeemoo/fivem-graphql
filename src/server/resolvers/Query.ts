export const peds = () => GetAllPeds().map((entityId) => ({ entityId }));
export const vehicles = () => GetAllVehicles().map((entityId) => ({ entityId }));
export const objects = () => GetAllObjects().map((entityId) => ({ entityId }));

export const sessions = () => {
  const numPlayers = GetNumPlayerIndices();
  const sessions = [];
  for (let i = 0; i < numPlayers; i++) {
    const playerId = GetPlayerFromIndex(i);
    if (playerId) {
      sessions.push({
        playerId
      });
    }
  }
  return sessions;
};