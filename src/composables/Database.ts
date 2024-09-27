import Dexie, { EntityTable } from "dexie";
import { Font } from "@/models/style/Font";
import { ResumeTemplate } from "@/models/ResumeTemplate";

let instance: Dexie & DatabaseSchema | undefined;

export function useDatabase(): Dexie & DatabaseSchema {
    if (instance) {
        return instance;
    }

    instance = new Dexie('resume-builder-db') as Dexie & DatabaseSchema;

    instance.version(1).stores({
        fonts: 'name,system',
        templates: 'id'
    });

    return instance;
}

interface DatabaseSchema {
    fonts: EntityTable<Font, 'name'>
    templates: EntityTable<ResumeTemplate, 'id'>
}