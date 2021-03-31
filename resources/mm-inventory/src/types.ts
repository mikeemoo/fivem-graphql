import { Container } from "types/graphql";

export type ResolveContainer = (container: Container | null) => void;
export type InventoryCallbacks = {
 loadInventory:  (sessionId: string, resolve: ResolveContainer) => void
}