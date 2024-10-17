import { useDatabase } from "@/composables/useDatabase";
import { deepToRaw } from "@/functions/Reactivity";
import { defaultLightTheme } from "@/functions/Themes";
import { defaultFont } from "@/functions/Fonts";
import { ResumeTemplate } from "@/models/ResumeTemplate";

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

    async function setTemplate(template: ResumeTemplate, copy: boolean = false): Promise<void> {
        // convert to a raw object without function
        const raw: ResumeTemplate = deepToRaw(template);

        // check for copying even when not specified
        // when the saved record does not exist already, it's a preset which needs a proper id
        if(!copy) {
            copy = await table.where('id').equals(raw.id).count() === 0;
        }

        // generate a new id
        if(copy) {
            raw.id = crypto.randomUUID();
        }

        await table.put(raw, raw.id);
    }

    async function getFallbackTemplate(): Promise<ResumeTemplate> {
        return presetTemplates[0];
    }

    async function getPresetTemplates(): Promise<ResumeTemplate[]> {
        return presetTemplates;
    }

    async function getCustomTemplates(): Promise<ResumeTemplate[]> {
        return table.toArray();
    }

    return {
        getTemplate,
        setTemplate,
        getFallbackTemplate,
        getPresetTemplates,
        getCustomTemplates
    };
}

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
