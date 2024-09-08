import Dexie, { EntityTable } from "dexie";
import Theme from "@/models/style/Theme";
import Font from "@/models/style/Font";
import { ResumeModel } from "@/models/resume/Resume";

let instance: Dexie & DatabaseSchema | undefined;

export function useDatabase(): Dexie & DatabaseSchema {
    if (instance) {
        return instance;
    }

    instance = new Dexie('resume-builder-db') as Dexie & DatabaseSchema;

    instance.version(1).stores({
        fonts: 'name,system',
        themes: 'id',
        templates: ''
    });

    return instance;
}

interface DatabaseSchema {
    themes: EntityTable<Theme, 'id'>
    fonts: EntityTable<Font, 'name'>
    templates: EntityTable<ResumeModel>
}