import { Db } from "mongodb";
import NodeCache from "node-cache";
import { Player } from "types/graphql";

const COLLECTION = "player";

const playerCache = new NodeCache();

export const getPlayerByIdentifiers = async (db: Db, identifiers: string[]) => {

  const cachedIdentifier = identifiers.find((identifier) => playerCache.has(identifier));

  if (cachedIdentifier) {
    const cachedPlayer = playerCache.get<Player>(cachedIdentifier);
    if (cachedPlayer) {
      return cachedPlayer;
    }
  }

  const playersCollection = db.collection(COLLECTION);
  const player: Player | undefined = await playersCollection.findOne({
    identifiers: { $in: identifiers }
  });
  
  if (player) {
    player.identifiers.forEach((identifier) => playerCache.set(identifier, player));
  }

  return player;
};

export const getPlayers = async (db: Db) => {
  const players: Player[] = await db.collection(COLLECTION).find({}).toArray();
  players.forEach((player) => player.identifiers.forEach((identifier) => playerCache.set(identifier, player)));
  return players;
}