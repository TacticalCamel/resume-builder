import { EntityTable } from "dexie";
import { useDatabase } from "@/composables/internal/Database";
import { ITemplateService } from "@/models/services/ITemplateService";
import { ResumeModel, SectionType } from "@/models/resume/Resume";
import { ReactiveQuery, useReactiveQuery } from "@/composables/internal/ReactiveQuery";

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
    private readonly _templates: ReactiveQuery<ResumeModel[]>

    constructor(templates: EntityTable<ResumeModel, 'id'>) {
        this._templates = useReactiveQuery(() => templates.toArray());
    }

    get templates(): ResumeModel[] {
        //return this._templates.value ?? [];

        const res: ResumeModel[] = [];

        for (let i = 0; i < 23; i++) {
            res.push({
                id: String(i),
                header: {
                    picture: undefined,
                    name: 'name',
                    profession: 'profession',
                    description: '',
                    contacts: [
                        {type: 0, value: '-------'},
                        {type: 0, value: '-------'},
                        {type: 0, value: '-------'},
                        {type: 0, value: '-------'}
                    ]
                },
                sections: [
                    {
                        title: 'Educations',
                        type: SectionType.educations,
                        elements: [
                            {
                                school: 'string',
                                major: 'string',
                                start: 'string',
                                finish: 'string'
                            }
                        ]
                    },
                    {
                        title: 'Educations',
                        type: SectionType.educations,
                        elements: [
                            {
                                school: 'string',
                                major: 'string',
                                start: 'string',
                                finish: 'string'
                            }
                        ]
                    },
                    {
                        title: 'Educations',
                        type: SectionType.educations,
                        elements: [
                            {
                                school: 'string',
                                major: 'string',
                                start: 'string',
                                finish: 'string'
                            }
                        ]
                    }
                ]
            });
        }

        return res;
    }
}

