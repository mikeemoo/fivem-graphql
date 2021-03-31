import { PlayerResolvers } from 'types/graphql';
import { getContainer } from '../providers/containers';
import { getActiveSessions, getIdentifiers } from '../providers/sessions';

export default {
  inventory: ({ id }) => getContainer(`inventor:${id}`),
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