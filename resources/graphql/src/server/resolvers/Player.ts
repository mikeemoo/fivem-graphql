import { sessions } from './Query';

export const session = ({ identifiers }: { identifiers: string[] }) => {
  const activeSessions = sessions();
  const session = activeSessions.find((session) => 
    session.identifiers.find((sessId) => identifiers.includes(sessId))
  );
  return session;
}