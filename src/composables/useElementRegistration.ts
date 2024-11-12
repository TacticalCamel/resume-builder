import { ref, readonly, Ref } from "vue";
import { SelectableElement } from "@/models/editor/SelectableElement";

export function useElementRegistration() {
    const elements: Ref<SelectableElement[]> = ref([]);

    /**
     * Add an element to the registered elements.
     * @param element The element to register.
     */
    function registerElement(element: SelectableElement): void {
        const index: number = elements.value.indexOf(element);

        if(index < 0) {
            elements.value.push(element);
        }
    }

    /**
     * Remove an element from the registered elements.
     * @param element The element to unregister.
     */
    function unregisterElement(element: SelectableElement): void {
        const index: number = elements.value.indexOf(element);

        if (index >= 0) {
            elements.value.splice(index, 1);
        }
    }

    return {
        elements: readonly(elements),
        registerElement,
        unregisterElement
    };
}