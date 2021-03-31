import { PlayerResolvers, Resolvers } from 'types/graphql';
import { sessions } from './query';

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
    const activeSessions = sessions();
    const session = activeSessions.find((session) => 
      session.identifiers.find((sessId) => identifiers.includes(sessId))
    );
    return session;
  }

} as PlayerResolvers