import Dexie, { EntityTable } from "dexie";
import { ResumeTemplate } from "@/models/ResumeTemplate";

// use a single database instance
let db: Database | undefined;

/**
 * This composable provides access to the indexed db instance used by the app.
 */
export function useDatabase(): Database {
    if (!db) {
        db = new Dexie('resume-builder-db') as Database;

        db.version(2).stores({
            templates: 'id'
        });
    }

    return db;
}

type Database = Dexie & {
    templates: EntityTable<ResumeTemplate, 'id'>
}