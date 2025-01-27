import Dexie, { EntityTable } from "dexie";
import { TemplateModel } from "@/models/Template.ts";

/**
 * This composable provides access to indexedDB tables.
 */
export function useDatabase(): DatabaseSchema {
    // initialize a database instance
    const database: Database = new Dexie('resume-builder-db') as Database;

    // define version and tables
    database.version(2).stores({
        templates: 'id'
    });

    // expose tables
    return {
        templates: database.templates
    };
}

type DatabaseSchema = {
    templates: EntityTable<TemplateModel, 'id'>
}

type Database = Dexie & DatabaseSchema;