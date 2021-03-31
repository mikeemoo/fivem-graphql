import { PlayerResolvers } from 'types/graphql';
import { getActiveSessions } from './query';
import { getIdentifiers } from './session';

export default {
  inventory: ({ id }) => ({
    id: `inventory:${id}`,
    size: 40,
    items: [{
      id: 1,
      name: "test"
    }]
  }),
  session: ({ identifiers }: { identifiers: string[] }) => {
    const activeSessions = getActiveSessions();

    const session = activeSessions
      .map(
        (sessionId) => ({ sessionId, identifiers: getIdentifiers(sessionId) })
      )
      .find((session) => 
        session.identifiers.find((id) => identifiers.includes(id)
      )
    );
    return session;
  }

} as PlayerResolvers