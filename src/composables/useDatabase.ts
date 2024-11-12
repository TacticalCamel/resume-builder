import Dexie, { EntityTable } from "dexie";
import { TemplateModel } from "@/models/Template";

/**
 * The database instance used by the app.
 */
let database: Database | undefined;

/**
 * This composable provides access to indexedDB tables.
 */
export function useDatabase(): DatabaseSchema {
    // initialize when accessed the first time
    database ??= initializeDb();

    function initializeDb(): Database {
        const db: Database = new Dexie('resume-builder-db') as Database;

        db.version(2).stores({
            templates: 'id'
        });

        return db;
    }

    // expose all tables
    return {
        templates: database.templates
    };
}

type DatabaseSchema = {
    templates: EntityTable<TemplateModel, 'id'>
}

type Database = Dexie & DatabaseSchema;