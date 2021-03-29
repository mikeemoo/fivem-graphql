export const isPlayer = ({ entityId })  => IsPedAPlayer(entityId);
export const armour = ({ entityId })    => GetPedArmour(entityId);
export const maxHealth = ({ entityId }) => GetPedMaxHealth(entityId);
export const heading = ({ entityId })   => GetEntityHeading(entityId);
export const health = ({ entityId })    => GetEntityHealth(entityId);
export const modelHash = ({ entityId }) => GetEntityModel(entityId);

export const type = ({ entityId }) => (
  (typeId) => typeId === 1 ? "ped": typeId === 2 ? "vehicle" : "prop"
)(GetEntityType(entityId));

export const rotation = ({ entityId }) =>  {
  const [ x, y, z ] = GetEntityRotation(entityId)
  return { x, y, z };
}

export const coords = ({ entityId }) =>  {
  const [ x, y, z ] = GetEntityCoords(entityId);
  return { x, y, z };
}