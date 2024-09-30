import { EntityTable } from "dexie";
import { useDatabase } from "@/composables/Database";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { ResumeTemplate } from "@/models/ResumeTemplate";
import { useThemes } from "@/composables/Themes";

let instance: TemplateService | undefined;
const {defaultLightTheme} = useThemes();

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

    public readonly predefinedTemplates: ResumeTemplate[] = [
        {
            id: 'empty',
            currentTheme: defaultLightTheme.id,
            currentFont: 'Inter',
            resume: {
                header: {
                    picture: undefined,
                    name: '',
                    profession: '',
                    description: '',
                    contacts: []
                },
                sections: []
            },
            themes: [],
            fonts: [{name: 'Inter', system: 0, data: undefined}],
            filters: {
                grayscale: 0,
                contrast: 100,
                brightness: 100
            }
        }
    ];

    constructor(templates: EntityTable<ResumeTemplate, 'id'>) {
        this._templates = templates;
        this._query = useReactiveQuery(() => this._templates.toArray());
    }

    get templates(): ResumeTemplate[] {
        return this._query.value ?? [];
    }

    async getById(id: string): Promise<ResumeTemplate | undefined> {
        return this.predefinedTemplates.find(template => template.id === id) ?? await this._templates.get(id);
    }

    async createTemplate(template: ResumeTemplate): Promise<void> {
        await this._templates.put(template, template.id);
    }
}

