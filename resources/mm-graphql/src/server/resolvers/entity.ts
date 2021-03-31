import { EntityResolvers } from "types/graphql";
import { getActiveSessions } from "../providers/sessions";

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

export default {
  isPlayer: ({ entityId })  => IsPedAPlayer(entityId),
  armour: ({ entityId })    => GetPedArmour(entityId),
  maxHealth: ({ entityId }) => GetPedMaxHealth(entityId),
  heading: ({ entityId })   => GetEntityHeading(entityId),
  health: ({ entityId })    => GetEntityHealth(entityId),
  modelHash: ({ entityId }) => GetEntityModel(entityId),
  causeOfDeath: ({ entityId }) => GetPedCauseOfDeath(entityId),
  populationType: ({ entityId }) => POPULATION_TYPE[GetEntityPopulationType(entityId)],
  type: ({ entityId }) => ENTITY_TYPES[GetEntityType(entityId)],
  numberPlate: ({ entityId }) => GetVehicleNumberPlateText(entityId),
  currentVehicle: ({ entityId }) => {
    const id = GetVehiclePedIsIn(entityId, false);
    return id ? { entityId: id } : null;
  },
  lastVehicle: ({ entityId }) => {
    const id = GetVehiclePedIsIn(entityId, true);
    return id ? { entityId: id } : null;
  },
  rotation: ({ entityId }) =>  {
    const [ x, y, z ] = GetEntityRotation(entityId)
    return { x, y, z };
  },
  coords: ({ entityId }) =>  {
    const [ x, y, z ] = GetEntityCoords(entityId);
    return { x, y, z };
  },
  session: ({ entityId }) => {
    if (!IsPedAPlayer(entityId)) {
      return;
    }
    return getActiveSessions().find(
      (sessionId) => GetPlayerPed(sessionId) === entityId
    )
  }
} as EntityResolvers;
