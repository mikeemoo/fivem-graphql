import { Container } from "types/graphql";

export type InventoryCallbacks = {
 loadInventory:  (sessionId: string, resolve: (container: Container) => void) => void
}