import { EntityTable } from "dexie";
import { useDatabase } from "@/composables/Database";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { ResumeTemplate } from "@/models/ResumeTemplate";

let instance: TemplateService | undefined;

export function useTemplateService(): TemplateService {
    if (instance) {
        return instance;
    }

    const db = useDatabase();

    instance = new TemplateService(db.templates);

    return instance;
}

class TemplateService {
    private readonly _templates: EntityTable<ResumeTemplate, 'id'>
    private readonly _query: ReactiveQuery<ResumeTemplate[]>

    constructor(templates: EntityTable<ResumeTemplate, 'id'>) {
        this._templates = templates;
        this._query = useReactiveQuery(() => this._templates.toArray());
    }

    get templates(): ResumeTemplate[] {
        return this._query.value ?? [];
    }

    async getById(id: string): Promise<ResumeTemplate | undefined> {
        return this._templates.get(id);
    }

    async createTemplate(template: ResumeTemplate): Promise<void> {
        await this._templates.put(template, template.id);
    }
}

