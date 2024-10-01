import { EntityTable } from "dexie";
import { useDatabase } from "@/composables/Database";
import { useStyleSheet } from "@/composables/StyleSheet";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { ResumeTemplate } from "@/models/ResumeTemplate";

const {defaultLightTheme, defaultFont} = useStyleSheet();

const predefinedTemplates: ResumeTemplate[] = [
    {
        id: 'empty',
        currentTheme: defaultLightTheme.id,
        currentFont: defaultFont,
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
        fonts: [
            {
                name: defaultFont,
                system: 0,
                data: undefined
            }
        ],
        filters: {
            grayscale: 0,
            contrast: 100,
            brightness: 100
        }
    }
];

export function useTemplates() {
    const db = useDatabase();
    const table: EntityTable<ResumeTemplate, 'id'> = db.templates;

    const templates: ReactiveQuery<ResumeTemplate[]> = useReactiveQuery(() => table.toArray());

    async function getTemplate(id: string): Promise<ResumeTemplate | undefined> {
        return predefinedTemplates.find(template => template.id === id) ?? await table.get(id);
    }

    async function setTemplate(template: ResumeTemplate): Promise<void> {
        await table.put(template, template.id);
    }

    return {
        templates,
        predefinedTemplates,
        getTemplate,
        setTemplate
    };
}