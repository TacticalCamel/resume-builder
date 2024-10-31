import { useDatabase } from "@/composables/useDatabase";
import { deepToRaw } from "@/functions/Reactivity";
import { defaultLightTheme } from "@/functions/Themes";
import { defaultFont } from "@/functions/Fonts";
import { TemplateModel } from "@/models/Template";

/**
 * This composable allows to query and modify locally saved templates.
 */
export function useTemplates() {
    const db = useDatabase();
    const table= db.templates;
    const fallbackId: string = 'fallback-template';

    async function setTemplate(template: TemplateModel, copy: boolean = false): Promise<string> {
        // convert to a raw object to remove functions
        const raw: TemplateModel = deepToRaw(template);

        // generate a new id when copied
        if(copy) {
            raw.id = crypto.randomUUID();
        }

        // update in database
        await table.put(raw, raw.id);

        // return the id
        return raw.id;
    }

    async function getTemplate(id: string): Promise<TemplateModel | undefined> {
        return table.get(id);
    }

    async function getEmptyTemplate(): Promise<TemplateModel> {
        // get the empty preset template
        const emptyTemplate: TemplateModel = presetTemplates[0];

        // store a copy of it in the database
        const id: string = await setTemplate(emptyTemplate, true);

        // return the copy
        return await getTemplate(id) ?? emptyTemplate;
    }

    async function getPresetTemplates(): Promise<TemplateModel[]> {
        return presetTemplates;
    }

    async function getCustomTemplates(): Promise<TemplateModel[]> {
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

const presetTemplates: TemplateModel[] = [
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
