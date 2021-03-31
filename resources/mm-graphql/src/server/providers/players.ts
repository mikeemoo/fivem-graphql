// imagine this is a database for now....
const players = [
  {
    id: 1,
    identifiers: [
      "license:d47b936bd803244bc048084384f44224d0420ebc"
    ],
    fullName: "Michael Michaelson"
  }
];

// todo: proper lookup
export const getPlayer = (identifiers: string[]) => players[0];
export const getPlayers = () => players;