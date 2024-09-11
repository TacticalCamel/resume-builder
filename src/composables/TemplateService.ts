import { EntityTable } from "dexie";
import { useDatabase } from "@/composables/internal/Database";
import { ReactiveQuery, useReactiveQuery } from "@/composables/internal/ReactiveQuery";
import { ResumeModel } from "@/models/resume/Resume";
import { ITemplateService } from "@/models/services/ITemplateService";

let instance: ITemplateService | undefined;

export function useTemplateService(): ITemplateService {
    if (instance) {
        return instance;
    }

    const db = useDatabase();

    instance = new TemplateService(db.templates);

    return instance;
}

class TemplateService implements ITemplateService {
    private readonly _templates: EntityTable<ResumeModel, 'id'>
    private readonly _query: ReactiveQuery<ResumeModel[]>

    constructor(templates: EntityTable<ResumeModel, 'id'>) {
        this._templates = templates;
        this._query = useReactiveQuery(() => this._templates.toArray());
    }

    get templates(): ResumeModel[] {
        return this._query.value ?? [];
    }

    async getById(id: string): Promise<ResumeModel | undefined> {
        return this._templates.get(id);
    }

    async createTemplate(resume: ResumeModel): Promise<void> {
        await this._templates.put(resume, resume.id);
    }
}

