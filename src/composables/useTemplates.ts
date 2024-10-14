import { useDatabase } from "@/composables/useDatabase";
import { deepToRaw } from "@/functions/Reactivity";
import { defaultLightTheme } from "@/functions/Themes";
import { defaultFont } from "@/functions/Fonts";
import { ResumeTemplate } from "@/models/ResumeTemplate";

const presetTemplates: ResumeTemplate[] = [
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
            }
        ],
        filters: {
            grayscale: 0,
            contrast: 100,
            brightness: 100
        }
    }
];

/**
 * This composable allows to query and modify locally saved templates.
 */
export function useTemplates() {
    const db = useDatabase();
    const table= db.templates;

    async function getTemplate(id: string): Promise<ResumeTemplate | undefined> {
        const preset: ResumeTemplate | undefined = presetTemplates.find(template => template.id === id);

        return preset ?? await table.get(id);
    }

    async function setTemplate(template: ResumeTemplate): Promise<void> {
        const raw: ResumeTemplate = deepToRaw(template);

        await table.put(raw, raw.id);
    }

    async function getPresetTemplates(): Promise<ResumeTemplate[]> {
        return presetTemplates;
    }

    async function getCustomTemplates(): Promise<ResumeTemplate[]> {
        return table.toArray();
    }

    return {
        getPresetTemplates,
        getCustomTemplates,
        getTemplate,
        setTemplate
    };
}

