const ENTITY_TYPES = ["", "PED", "VEHICLE", "PROP"];

const POPULATION_TYPE = [
  "UNKNOWN",
  "RANDOM_PERMANENT",
  "RANDOM_PARKED",
  "RANDOM_PATROL",
  "RANDOM_SCENARIO",
  "RANDOM_AMBIENT",
  "PERMANENT",
  "MISSION",
  "REPLAY",
  "CACHE",
  "TOOL"
];

export const isPlayer = ({ entityId })  => IsPedAPlayer(entityId);
export const armour = ({ entityId })    => GetPedArmour(entityId);
export const maxHealth = ({ entityId }) => GetPedMaxHealth(entityId);
export const heading = ({ entityId })   => GetEntityHeading(entityId);
export const health = ({ entityId })    => GetEntityHealth(entityId);
export const modelHash = ({ entityId }) => GetEntityModel(entityId);
export const populationType = ({ entityId }) => POPULATION_TYPE[GetEntityPopulationType(entityId)];
export const type = ({ entityId }) => ENTITY_TYPES[GetEntityType(entityId)]

export const rotation = ({ entityId }) =>  {
  const [ x, y, z ] = GetEntityRotation(entityId)
  return { x, y, z };
}

export const coords = ({ entityId }) =>  {
  const [ x, y, z ] = GetEntityCoords(entityId);
  return { x, y, z };
}