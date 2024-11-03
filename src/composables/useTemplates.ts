import { useDatabase } from "@/composables/useDatabase";
import { deepToRaw } from "@/functions/Reactivity";
import { defaultThemes } from "@/functions/Themes";
import { defaultFont } from "@/functions/Fonts";
import { TemplateModel } from "@/models/Template";

/**
 * This composable allows to query and modify locally saved templates.
 */
export function useTemplates() {
    const db = useDatabase();
    const table = db.templates;

    /**
     * Arbitrary id designating the empty template.
     */
    const fallbackId: string = 'fallback-template';

    /**
     * Save a template to the database.
     * @param template The template to save.
     * @param copy Set to true to save a copy of the template.
     * @returns The id of the template. Use this id for further operations on the template.
     */
    async function setTemplate(template: TemplateModel, copy: boolean = false): Promise<string> {
        // convert to a raw object to remove functions
        const raw: TemplateModel = deepToRaw(template);

        // generate a new id when copied
        if (copy || !raw.id) {
            raw.id = crypto.randomUUID();
        }

        // update in database
        // this will modify an existing entity when the id already exists and insert a new one otherwise
        await table.put(raw, raw.id);

        // return the actual id
        return raw.id;
    }

    /**
     * Find a template in the database by id.
     * @param id The id to find.
     * @returns The template with the provided id if one exists, otherwise undefined.
     */
    async function getTemplate(id: string): Promise<TemplateModel | undefined> {
        return table.get(id);
    }

    /**
     * Remove a template from the database by id.
     * @param id The id of the template to remove.
     */
    async function removeTemplate(id: string): Promise<void> {
        return table.delete(id);
    }

    /**
     * Create then return a new template with minimal information.
     * @returns The empty template.
     */
    async function getEmptyTemplate(): Promise<TemplateModel> {
        // get the empty preset template
        const emptyTemplate: TemplateModel = presetTemplates[0];

        // store a copy of it in the database
        const id: string = await setTemplate(emptyTemplate, true);

        // return the copy
        return await getTemplate(id) ?? emptyTemplate;
    }

    /**
     * Get all preset templates.
     * @returns A list containing all preset templates.
     */
    async function getPresetTemplates(): Promise<TemplateModel[]> {
        return presetTemplates;
    }

    /**
     * Get all templates from the database.
     * @returns A list containing all custom templates.
     */
    async function getCustomTemplates(): Promise<TemplateModel[]> {
        return table.toArray();
    }

    return {
        fallbackId,
        setTemplate,
        getTemplate,
        removeTemplate,
        getEmptyTemplate,
        getPresetTemplates,
        getCustomTemplates
    };
}

const presetTemplates: TemplateModel[] = [
    {
        id: 'empty',
        currentTheme: defaultThemes.light.id,
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
        styles: []
    }
];
