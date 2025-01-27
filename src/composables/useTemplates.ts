import { useDatabase } from "@/composables/useDatabase";
import { deepToRaw } from "@/functions/Reactivity";
import { TemplateModel } from "@/models/Template";

/**
 * This composable allows to query and modify locally saved templates.
 */
export function useTemplates() {
    const {templates} = useDatabase();

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
        await templates.put(raw, raw.id);

        // return the actual id
        return raw.id;
    }

    /**
     * Find a template in the database by id.
     * @param id The id to find.
     * @returns The template with the provided id if one exists, otherwise undefined.
     */
    async function getTemplate(id: string): Promise<TemplateModel | undefined> {
        return templates.get(id);
    }

    /**
     * Remove a template from the database by id.
     * @param id The id of the template to remove.
     */
    async function removeTemplate(id: string): Promise<void> {
        return templates.delete(id);
    }

    /**
     * Get all templates from the database.
     * @returns A list containing all custom templates.
     */
    async function getTemplates(): Promise<TemplateModel[]> {
        return templates.toArray();
    }

    return {
        setTemplate,
        getTemplate,
        removeTemplate,
        getTemplates
    };
}