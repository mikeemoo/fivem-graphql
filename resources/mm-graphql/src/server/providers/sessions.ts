export const getIdentifiers = (sessionId: string) => {
  const numIds = GetNumPlayerIdentifiers(sessionId);
  let identifiers: string[] = [];
  for (let i = 0; i < numIds; i++) {
      identifiers.push(GetPlayerIdentifier(sessionId, i));
  }
  return identifiers;
}

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