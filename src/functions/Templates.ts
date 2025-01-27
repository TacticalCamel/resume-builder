import { useTemplates } from "@/composables/useTemplates";
import { TemplateModel } from "@/models/Template";
import { defaultThemes } from "@/functions/ThemeUtilities";
import { defaultFont } from "@/functions/Fonts";

const {getTemplate, setTemplate} = useTemplates();

export {
    getTemplate,
    setTemplate
};

/**
 * Arbitrary id designating the empty template.
 */
const fallbackId: string = 'fallback-template';

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


export function getFallbackId(): string {
    return fallbackId;
}

export function isFallbackTemplate(id: string): boolean {
    return id === fallbackId;
}

/**
 * Get all preset templates.
 * @returns A list containing all preset templates.
 */
export async function getPresetTemplates(): Promise<TemplateModel[]> {
    return presetTemplates;
}


/**
 * Create then return a new template with minimal information.
 * @returns The empty template.
 */
export async function getEmptyTemplate(): Promise<TemplateModel> {
    // get the empty preset template
    const emptyTemplate: TemplateModel = presetTemplates[0];

    // store a copy of it in the database
    const id: string = await setTemplate(emptyTemplate, true);

    // return the copy
    return await getTemplate(id) ?? emptyTemplate;
}