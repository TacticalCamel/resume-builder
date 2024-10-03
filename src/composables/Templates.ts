import { isProxy, isReactive, isRef, toRaw } from "vue";
import { useDatabase } from "@/composables/Database";
import { useStyleSheet } from "@/composables/StyleSheet";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { EntityTable } from "dexie";
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
        const raw: ResumeTemplate = deepToRaw(template);

        await table.put(raw, raw.id);
    }

    return {
        templates,
        predefinedTemplates,
        getTemplate,
        setTemplate
    };
}

// reactive proxies contain functions, which can not be serialized, so the object must be recursively converted
// https://github.com/vuejs/core/issues/5303#issuecomment-1543596383
function deepToRaw<T extends Record<string, any>>(sourceObj: T): T {
    const objectIterator = (input: any): any => {
        if (Array.isArray(input)) {
            return input.map((item) => objectIterator(item));
        }

        if (isRef(input) || isReactive(input) || isProxy(input)) {
            return objectIterator(toRaw(input));
        }

        if (input && typeof input === 'object') {
            // special treatment for array buffers
            if(input.byteLength){
                return input;
            }

            return Object.keys(input).reduce((acc, key) => {
                acc[key as keyof typeof acc] = objectIterator(input[key]);
                return acc;
            }, {} as T);
        }

        return input;
    };

    return objectIterator(sourceObj);
}