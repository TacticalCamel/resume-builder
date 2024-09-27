import { inject, provide } from "vue";

export function useEditable() {
    function provideEditable(value: boolean) {
        provide<boolean>('editable', value);
    }

    const editable: boolean = inject<boolean>('editable', false);

    return {
        editable,
        provideEditable
    };
}