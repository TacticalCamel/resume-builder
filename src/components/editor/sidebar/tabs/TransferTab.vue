<script setup lang="ts">
    import { inject, Ref } from "vue";
    import { autosaveInjectorKey } from "@/keys";
    import { useTemplates } from "@/composables/useTemplates";
    import { useNotifications } from "@/composables/useNotifications";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import TemplateImport from "@/components/editor/sidebar/items/TemplateImport.vue";
    import TemplateExport from "@/components/editor/sidebar/items/TemplateExport.vue";
    import { SaveState } from "@/models/SaveState";

    const {setTemplate} = useTemplates();
    const {displayNotification} = useNotifications();

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const {state, frequency, save} = inject<{
        state?: Ref<SaveState>
        frequency?: Ref<number>
        save?: () => Promise<void>
    }>(autosaveInjectorKey, {});

    async function saveTemplateAsCopy() {
        await setTemplate({...template.value, id: crypto.randomUUID()});

        displayNotification('success', {
            message: 'Copied template'
        });
    }

    function importTemplate(uploadedTemplate: ResumeTemplate) {
        template.value = uploadedTemplate;
    }

    function getAutosaveText(value: number): string {
        if (value < 0) {
            return 'Never';
        }

        if (value === 0) {
            return 'Always';
        }

        return `Every ${value} minute${value === 1 ? '' : 's'}`;
    }

    function getAutosaveValue(value: number): number {
        if (value <= 0) {
            return value;
        }

        return value * 60000;
    }
</script>

<template>
    <editor-tab>
        <template-import @import="importTemplate"/>

        <template-export :template="template"/>

        <editor-tab-item title="save options">
            <div class="grid grid-cols-2 gap-2">
                <div class="text-foreground/70">Autosave</div>
                <select v-model="frequency" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 focus:outline-foreground">
                    <option v-for="value in [-1, 0, 1, 2, 5, 10, 30]" :value="getAutosaveValue(value)">
                        {{ getAutosaveText(value) }}
                    </option>
                </select>

                <div class="text-foreground/70">Save template</div>
                <button
                    class="text-center p-0.5 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                    @click="save"
                    :disabled="state !== SaveState.waiting"
                >
                    Save
                </button>

                <div class="text-foreground/70">Create copy</div>
                <button class="text-center p-0.5 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveTemplateAsCopy()">Copy</button>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>