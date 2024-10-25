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
    const fallbackId: string = 'fallback-template';

    async function setTemplate(template: ResumeTemplate, copy: boolean = false): Promise<string> {
        // convert to a raw object without function
        const raw: ResumeTemplate = deepToRaw(template);

        // generate a new id when copied
        if(copy) {
            raw.id = crypto.randomUUID();
        }

        // update in database
        await table.put(raw, raw.id);

        // return the id
        return raw.id;
    }

    async function getTemplate(id: string): Promise<ResumeTemplate | undefined> {
        return table.get(id);
    }

    async function getEmptyTemplate(): Promise<ResumeTemplate> {
        const template: ResumeTemplate = presetTemplates[0];
        const id: string = await setTemplate(presetTemplates[0], true);

        return await getTemplate(id) ?? template;
    }

    async function getPresetTemplates(): Promise<ResumeTemplate[]> {
        return presetTemplates;
    }

    async function getCustomTemplates(): Promise<ResumeTemplate[]> {
        return table.toArray();
    }

    return {
        fallbackId,
        setTemplate,
        getTemplate,
        getEmptyTemplate,
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
            id: crypto.randomUUID(),
            header: {
                id: crypto.randomUUID(),
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
        },
        styles: [
            {
                selectors: [],
                styles: {'background': 'red'}
            }
        ]
    }
];
