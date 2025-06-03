// lib/react-query/persister.ts
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const localStoragePersister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});
