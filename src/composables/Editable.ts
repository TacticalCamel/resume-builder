import { provide, inject } from "vue";

const injectorKey = Symbol();

export function useEditable() {
    function provideEditable(value: boolean) {
        provide<boolean>(injectorKey, value);
    }

    const editable: boolean = inject<boolean>(injectorKey, false);

    return {
        editable,
        provideEditable
    };
}